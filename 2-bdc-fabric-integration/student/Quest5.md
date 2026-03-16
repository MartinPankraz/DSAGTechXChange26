# 🔌 5. Challenge 5: Adjust Business Process Solutions
[< 🤖 Quest 4](Quest4.md) - **[🔧 Quest 6 >](Quest6.md)**

Microsoft Business Process Solutions does not yet support mirored SAP databases as a source out of the box.However, with a handful of adjustments, we can make it work. In this chapter, we will adjust the standard pipelines and notebooks provided by Business Process Solutions accordingly.

## 5.1. Navigate to the workspace

![Navigate to workspace](../images/quest3/200-navigate-to-workspace.png)

## 5.2. Locate bronze-to-silver orchestration pipeline

Locate the orchestration pipeline for data processing from silver to gold layer: bps_orchestration_pipeline_full_processing_***

![](../images/quest5/.png)

## 5.3. Adjust bronze layer in orchestration pipeline

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
            logger.debug(f"Casting column {column_name} to data type {data_type}")
            input_df = input_df.withColumn(column_name, input_df[column_name].cast(data_type))
    return input_df
```

![](../images/quest5/.png)

## 5.4.

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
