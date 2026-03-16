
# 🔌 6. Challenge 6: Adjust transformations for dimensions
[< 🤖 Quest 5](Quest5.md) - **[🔧 Quest 7 >](Quest7.md)**

Microsoft Business Process Solutions uses Python notebooks for data transformations. In this challenge, we will make the necessary adjustments to process dimension data.

## 6.1. Navigate to the workspace and locate notebook ```bps_opm_nb_b2s_dim_***```

You don't need help for this anymore ;)

## 6.2. Adjust bronze-to-silver notebook for dimensions

Notebook ```bps_opm_nb_b2s_dim_*** ``` handles transformation of dimenension and text data from bronze to silver layer. To support data in the format delivered by SAP Datasphere, we need to make some adjustments to this notebook.

### 6.2.1. Adjust function ```apply_data_types```

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
### 6.2.2. Convert column names to upper case

SAP Datasphere generates column names in camel case, while higer layers in Business Process Solutions require them in upper case. Let's fix this!
Still in notebook ```bps_opm_nb_b2s_dim_*** ``` , search for ```fix dataframe data types```.

Create a new code cell right above the "Fix dataframe data types" snippet.

![](../images/quest6/410-bps-notebook-add-upper-case-code.png)

Insert the following code into the new cell:

```python
exclude_cols = ["_SystemName", "_UpdateTimeStamp", "_Delete", "_change_type"]
bronze_spark_df = bronze_spark_df.select([
    F.col(c).alias(c if c in exclude_cols else c.upper())
    for c in bronze_spark_df.columns
])
```

Your code should now look like this:

![](../images/quest6/430-bps-notebook-add-upper-case-code-3.png)

### 6.2.3. Fix Langueage codes

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

Your code should now look like this:

![](../images/quest6/440-bps-notebook-add-language-code.png)

# Where to next?

**[🤖 Quest 5](Quest5.md) - [🔧 Quest 7 >](Quest7.md)

[🔝](#)
