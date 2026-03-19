
# 🔌 6. Challenge 6: Adjust transformations for dimensions
[< 🤖 Quest 5](Quest5.md) - **[🔧 Quest 7 >](Quest7.md)**

Microsoft Business Process Solutions uses Python notebooks for data transformations. In this challenge, we will make the necessary adjustments to process **dimension data**.

## 6.1. Navigate to the workspace and locate notebook ```bps_opm_nb_b2s_dim_***```

You don't need help for this anymore ;)

## 6.2. Adjust bronze-to-silver notebook for dimensions

Notebook ```bps_opm_nb_b2s_dim_*** ``` handles transformation of dimension and text data from bronze to silver layer. To support data in the format delivered by SAP Datasphere, we need to make some adjustments to this notebook.

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

### 6.2.3. Fix Language codes

SAP Datasphere provides language codes in ISO format, while Business Process Solutions currently uses the SAP internal representation. Let's fix this!

**Behind** the "Fix dataframe data types" code (before the "Merge delta table" code), insert a new code cell and paste the following code into it:

```python
from pyspark.sql.column import Column
 
def get_sap_language_expression(column_name: str = "LANGUAGE") -> Column:
    c = col(column_name)
    sap_language_expr = (
            when(c == 'AF', 'a')
            .when(c == 'SR', '0')
            .when(c == 'ZH', '1')
            .when(c == 'TH', '2')
            .when(c == 'KO', '3')
            .when(c == 'RO', '4')
            .when(c == 'SL', '5')
            .when(c == 'HR', '6')
            .when(c == 'MS', '7')
            .when(c == 'UK', '8')
            .when(c == 'ET', '9')
            .when(c == 'AR', 'A')
            .when(c == 'HE', 'B')
            .when(c == 'CS', 'C')
            .when(c == 'DE', 'D')
            .when(c == 'EN', 'E')
            .when(c == 'FR', 'F')
            .when(c == 'EL', 'G')
            .when(c == 'HU', 'H')
            .when(c == 'IT', 'I')
            .when(c == 'JA', 'J')
            .when(c == 'DA', 'K')
            .when(c == 'PL', 'L')
            .when(c == 'ZF', 'M')
            .when(c == 'NL', 'N')
            .when(c == 'NO', 'O')
            .when(c == 'PT', 'P')
            .when(c == 'SK', 'Q')
            .when(c == 'RU', 'R')
            .when(c == 'ES', 'S')
            .when(c == 'TR', 'T')
            .when(c == 'FI', 'U')
            .when(c == 'SV', 'V')
            .when(c == 'BG', 'W')
            .when(c == 'LT', 'X')
            .when(c == 'LV', 'Y')
            .when(c == 'Z1', 'Z')
            .when(c == 'IS', 'b')
            .when(c == 'CA', 'c')
            .when(c == 'SH', 'd')
            .when(c == 'ID', 'i')
            .when(c == 'HI', '묩')
            .when(c == 'KK', '뱋')
            .when(c == 'VI', '쁩')
            .otherwise(None)  # Default case
        )
 
    return sap_language_expr
 
if 'LANGUAGE' in bronze_spark_df.columns:
    bronze_spark_df = bronze_spark_df.withColumn('LANGUAGE', get_sap_language_expression('LANGUAGE'))
 
if 'LANGUAGECODE' in bronze_spark_df.columns:
    bronze_spark_df = bronze_spark_df.withColumn('LANGUAGECODE', get_sap_language_expression('LANGUAGECODE'))
```

Your code should now look like this:

![](../images/quest6/440-bps-notebook-add-language-code.png)

# Where to next?

**[🤖 Quest 5](Quest5.md) - [🔧 Quest 7 >](Quest7.md)

[🔝](#)
