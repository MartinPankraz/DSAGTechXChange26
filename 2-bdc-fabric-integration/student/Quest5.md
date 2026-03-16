# 🔌 5. Challenge 5: Adjust pipelines
[< 🤖 Quest 4](Quest4.md) - **[🔧 Quest 6 >](Quest6.md)**

Microsoft Business Process Solutions does not yet support mirored SAP databases as a source out of the box.However, with a handful of adjustments, we can make it work. In this chapter, we will adjust the standard pipelines and notebooks provided by Business Process Solutions accordingly.

## 5.1. Navigate to the workspace

![Navigate to workspace](../images/quest3/200-navigate-to-workspace.png)

## 5.2. Locate bronze-to-silver orchestration pipeline

Locate the orchestration pipeline for data processing from silver to gold layer: bps_om_b2s_orchestration_pipeline_***

replace the default value of parameter ```Mirror_Database_Name``` with ```sap-mirror-via-datasphere```.
save the pipeline.

![](../images/quest5/.png)

## 5.3. Adjust bronze layer in orchestration pipeline

## 5.4. Adjust bronze-to-silver pipeline for dimensions

open bps_om_b2s_dim_processing_***

click on Lookup activity "Get Dimension Tables"
switch to "Settings" tab
double click on "Query"

replace with

```SQL
@concat('select distinct CDSViewName,REGEXP_REPLACE(CDSViewName, ''\$[EFPT]'', '''') AS ODPName, KeyFields from extractionMetadata em join systemDetails sd on em.SystemName = sd.SystemName where em.Type <> ''FACT'' and em.inScope = 1 and sd.SourceType = ''SAP'' and sd.ConnectionType = ''OpenMirroring'' and em.SystemName = ''', pipeline().parameters.System_Name, '''')
```
save the pipeline

## 5.5. Adjust bronze-to-silver pipeline for facts

Apply the same change to pipeline bps_om_b2s_fact_processing_***

click on Lookup activity "Get Dimension Tables"
switch to "Settings" tab
double click on "Query"

replace with

```SQL
@concat('select distinct CDSViewName,REGEXP_REPLACE(CDSViewName, ''\$[EFPT]'', '''') AS ODPName, KeyFields from extractionMetadata em join systemDetails sd on em.SystemName = sd.SystemName where em.Type <> ''FACT'' and em.inScope = 1 and sd.SourceType = ''SAP'' and sd.ConnectionType = ''OpenMirroring'' and em.SystemName = ''', pipeline().parameters.System_Name, '''')
```

save the pipeline




Notebook ```bps_opm_nb_b2s_dim_*** ``` (where *** is a random alphanumeric identifier) handles transformation of dimenension and text data from bronze to silver layer. To support data in the format delivered by SAP Datasphere, we need to make some adjustments to this notebook.

### 5.4.1 Adjust function ```apply_data_types```

SAP Datasphere formats date columns in a slightly different way than the supported Open Mirroring solutions do. Let's adjust the code to take care of that:

Open notebook ```bps_opm_nb_b2s_dim_*** ``` and find function ```apply_data_types```. After line 28, insert to following code snippet

```python
            if field['dataType'] == 'DATS':
                input_df = input_df.withColumn(column_name, F.to_date(input_df[column_name], "yyyyMMdd"))
```

The function should now read as follows:

```python
def apply_data_types(
    input_df,
    table_metadata,
    sap_data_type_mapping,
    logger):

    # load schema into object
    schema_list = table_metadata
    # get columns for input_df
    col_set = set(input_df.columns)

    fields = {}
    # Use a for loop to create StructField objects
    for field in schema_list:
        field = json.loads(field)
        column_name = field['fieldName']
        if field['dataType'] in sap_data_type_mapping:
            data_type = sap_data_type_mapping[field['dataType']]

            # if datatype is decimal, fix the length and decimal fields
            if isinstance(data_type, DecimalType):
                data_type = DecimalType(field['length'], field['decimals'])
        else:
            data_type = StringType()

        if column_name in col_set and data_type != StringType():
            if field['dataType'] == 'NUMC':
                input_df = input_df.withColumn(column_name, F.when(F.col(column_name) == "00000000", F.lit(None)).otherwise(F.col(column_name)))
            if field['dataType'] == 'DATS':
                input_df = input_df.withColumn(column_name, F.to_date(input_df[column_name], "yyyyMMdd"))
            logger.debug(f"Casting column {column_name} to data type {data_type}")
            input_df = input_df.withColumn(column_name, input_df[column_name].cast(data_type))
    return input_df
```
### 5.4.2 Convert column names to upper case

SAP Datasphere generates column names in camel case, while higer layers in Business Process Solutions require them in upper case. Let's fix this!
Sill in notebook ```bps_opm_nb_b2s_dim_*** ``` , search for ```fix dataframe data types```

Create a new code cell right above the "Fix dataframe data types" snippet.

![](../images/quest5/.png)

![](../images/quest5/.png)

```python
exclude_cols = ["_SystemName", "_UpdateTimeStamp", "_Delete", "_change_type"]
bronze_spark_df = bronze_spark_df.select([
    F.col(c).alias(c if c in exclude_cols else c.upper())
    for c in bronze_spark_df.columns
])
```

You should now see the following code: (#3)

![](../images/quest5/.png)

### 5.4.3 Fix Langueage codes

SAP Datasphere provides language codes in ISO format, while Business Process Solutions currently uses the SAP internal representation. Let's fix this!

**Behind** the "Fix dataframe data types" code (before the "Merge delta table" code), insert a new code cell and paste the following code into it:

```python
def get_sap_language_expression() -> Column:
    sap_language_expr = (
            when(col("LANGUAGE") == 'AF', 'a')
            .when(col("LANGUAGE") == 'SR', '0')
            .when(col("LANGUAGE") == 'ZH', '1')
            .when(col("LANGUAGE") == 'TH', '2')
            .when(col("LANGUAGE") == 'KO', '3')
            .when(col("LANGUAGE") == 'RO', '4')
            .when(col("LANGUAGE") == 'SL', '5')
            .when(col("LANGUAGE") == 'HR', '6')
            .when(col("LANGUAGE") == 'MS', '7')
            .when(col("LANGUAGE") == 'UK', '8')
            .when(col("LANGUAGE") == 'ET', '9')
            .when(col("LANGUAGE") == 'AR', 'A')
            .when(col("LANGUAGE") == 'HE', 'B')
            .when(col("LANGUAGE") == 'CS', 'C')
            .when(col("LANGUAGE") == 'DE', 'D')
            .when(col("LANGUAGE") == 'EN', 'E')
            .when(col("LANGUAGE") == 'FR', 'F')
            .when(col("LANGUAGE") == 'EL', 'G')
            .when(col("LANGUAGE") == 'HU', 'H')
            .when(col("LANGUAGE") == 'IT', 'I')
            .when(col("LANGUAGE") == 'JA', 'J')
            .when(col("LANGUAGE") == 'DA', 'K')
            .when(col("LANGUAGE") == 'PL', 'L')
            .when(col("LANGUAGE") == 'ZF', 'M')
            .when(col("LANGUAGE") == 'NL', 'N')
            .when(col("LANGUAGE") == 'NO', 'O')
            .when(col("LANGUAGE") == 'PT', 'P')
            .when(col("LANGUAGE") == 'SK', 'Q')
            .when(col("LANGUAGE") == 'RU', 'R')
            .when(col("LANGUAGE") == 'ES', 'S')
            .when(col("LANGUAGE") == 'TR', 'T')
            .when(col("LANGUAGE") == 'FI', 'U')
            .when(col("LANGUAGE") == 'SV', 'V')
            .when(col("LANGUAGE") == 'BG', 'W')
            .when(col("LANGUAGE") == 'LT', 'X')
            .when(col("LANGUAGE") == 'LV', 'Y')
            .when(col("LANGUAGE") == 'Z1', 'Z')
            .when(col("LANGUAGE") == 'IS', 'b')
            .when(col("LANGUAGE") == 'CA', 'c')
            .when(col("LANGUAGE") == 'SH', 'd')
            .when(col("LANGUAGE") == 'ID', 'i')
            .when(col("LANGUAGE") == 'HI', '묩')
            .when(col("LANGUAGE") == 'KK', '뱋')
            .when(col("LANGUAGE") == 'VI', '쁩')
            .otherwise(None)  # Default case
        )

    return sap_language_expr

if 'LANGUAGE' in bronze_spark_df.columns:
    _iso_language_expr = get_sap_language_expression()
    bronze_spark_df = bronze_spark_df.withColumn('SAPLANGUAGE', _iso_language_expr)
    bronze_spark_df = bronze_spark_df.drop('LANGUAGE')
    bronze_spark_df = bronze_spark_df.withColumnRenamed('SAPLANGUAGE', 'LANGUAGE')
```

![](../images/quest5/.png)

## 5.5.

Select the "Account Payables" insight.

![](../images/quest5/.png)

## 5.6.

![](../images/quest5/.png)

## 5.7.

![](../images/quest5/.png)




## 4.8.

![](../images/quest4/340-SAP-mirror-creating.png)

## 4.9.

![](../images/quest4/350-SAP-mirror-replicating.png)

## 4.10.

![](../images/quest4/360-SAP-mirror-done.png)


# Where to next?

**[🤖 Quest 4](Quest4.md) - [🔧 Quest 6 >](Quest6.md)

[🔝](#)
