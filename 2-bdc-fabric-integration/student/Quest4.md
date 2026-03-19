# 🔌 4. Challenge 4: Mirror SAP data into Fabric
[< 🤖 Quest 3](Quest3.md) - **[🔧 Quest 5 >](Quest5.md)**

In quest 4, we will use Fabric's mirror engine to replicate the SAP Account Payables data into Microsoft Fabric.

## 4.1. Navigate to workspace

Navigate back to your workspace.

![Navigate to workspace](../images/quest3/200-navigate-to-workspace.png)

## 4.2. Create mirrored SAP

Create a new "mirrored SAP" item in your workspace. This will guide you through the configuration of the mirror engine for SAP Datasphere data and start the replication.

![](../images/quest4/280-SAP-mirror-launch.png)

## 4.3. Select Lakehoue

For SAP Datasphere, the Fabric mirror engine uses the ADLS Gen2 shortcut we created earlier. Select the Lakehouse containing the shortcut.

![](../images/quest4/290-SAP-mirror-select-connection.png)

## 4.4. Select shortcut path

Click on "Browse" and select the ALDS Gen2 storage container (i.e. your shortcut) as root folder.

![](../images/quest4/300-SAP-mirror-select-shortcut-path.png)

## 4.5. Proceed

Once you see all subfolders of the storage container, click "OK".

![blabla](../images/quest4/310-SAP-mirror-select.png)

## 4.6. Proceed

Click "Next" to proceed.

![](../images/quest4/320-SAP-mirror-continue.png)

## 4.7. Provide a mirrored database name

Now you can provide a name for the mirrored database. If you change the proposed name, you will have to remember it later when adjusting the BPS pipelines. 

![](../images/quest4/330-SAP-mirror-create-mirrored-db.png)

## 4.8. Creating Mirrored Database

The mirrored database will now be created.

![](../images/quest4/340-SAP-mirror-creating.png)

## 4.9. Check data replication

Once the mirrored database is set up, replication will start. Hit "Refresh" to see how data is being replicated into the mirrored database.

![](../images/quest4/350-SAP-mirror-replicating.png)

## 4.10. Replication finished

Ater a few moments, the replication will be finished.

> [!NOTE]
> At the top right, you can switch to the "SQL Analytics endpoint" of your mirrored database. From there, you can preview the replicated data or run SQL queries to inspect it in more detail.

![](../images/quest4/360-SAP-mirror-done.png)


# Where to next?

**[🤖 Quest 3](Quest3.md) - [🔧 Quest 5 >](Quest5.md)

[🔝](#)
