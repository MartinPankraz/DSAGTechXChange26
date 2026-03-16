# 🔌 7. Challenge 7: Adjust fact processing
[< 🤖 Quest 6](Quest6.md) - **[🔧 Quest 8 >](Quest8.md)**

Fact data is processed in a similar way like dimensions - hence we will make similar adjustemnts to the fact notebook as well.

## 7.1. Navigate to the workspace

## 7.2. Adjust bronze-to-silver notebook for facts

Notebook ```bps_opm_nb_b2s_fact_*** ``` (where *** is a random alphanumeric identifier) handles transformation of fact data from bronze to silver layer. To support data in the format delivered by SAP Datasphere, we need to make some adjustments to this notebook.

### 7.2.1. Adjust function ```apply_data_types```

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
### 7.2.2. Convert column names to upper case

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

# Where to next?

**[🤖 Quest 6](Quest6.md) - [🔧 Quest 8 >](Quest8.md)

[🔝](#)
