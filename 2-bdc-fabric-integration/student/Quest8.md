# 🔌 8. Challenge 8: Adjust fact processing
[< 🤖 Quest 7](Quest7.md) - **[🔧 Quest 8 >](Quest8.md)**

## 8.1. Process data from bronze to silver

Our bronze layer contains the raw source data mirrored via SAP Datasphere. Let's populate the silver layer by running the corresponding orchestration pipeline ```bps_om_b2s_orchestration_pipeline_***```.

![](../images/quest8/449-run-b2s-orchestration-pipe.png)

> [!NOTE]
> The pipeline should take about 15 minutes to run.

## 8.2. Process data from silver to gold

In the gold layer, data is formatted in a way optimized for consupmtion in Power BI. For example, surrogate keys are introduced, and a Power BI semantic model is created on top of the gold layer.
Let's process data from silver to gold by running pipeline ```bps_orchestration_pipeline_full_processing_***```.

![](../images/quest8/460-run-bps_orchestration_pipeline_full_processing.png)

> [!NOTE]
> The pipeline should take about 20 minutes to run.

## 8.3. Refresh semantic model

## 8.4. Launch Power BI report

# Where to next?

**[🤖 Quest 7](Quest7.md) - [🔧 Quest 8 >](Quest8.md)

[🔝](#)
