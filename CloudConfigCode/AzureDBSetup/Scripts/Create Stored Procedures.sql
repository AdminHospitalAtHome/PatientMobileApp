CREATE OR ALTER TRIGGER [dbo].[Patient_Weight_Alert]
ON [dbo].[Patient_Weight]
AFTER INSERT AS
BEGIN
    -- DECLARE @currentWeightAlert INT
    DECLARE @patientID INT
    SELECT @patientID = (SELECT TOP(1) PatientID FROM INSERTED)
    -- CHECK IF PATIENTID IS IN THE IN THE Patient_weight_alert table
	DECLARE @Temp_Patient_Alert_Level TABLE (UniqueID INT, PatientID INT, Weight_Level INT, Heart_Rate_Level INT, Blood_Oxygen_Level INT, Blood_Pressure_Level INT, Custom_Alert_Levels VARCHAR(MAX))

	INSERT INTO @Temp_Patient_Alert_Level SELECT * FROM [dbo].[Patient_Alert_Levels] WHERE PatientID = @patientID


	DECLARE @Temp_Weight TABLE(UniqueID INT, PatientID INT, DateTimeTaken DATETIME, WeightInPounds INT, IfManualInput BIT)

	DECLARE @Red_Day_Frame INT
	DECLARE @Yellow_Day_Frame INT

	DECLARE @Red_Weight_Change INT
	DECLARE @Yellow_Weight_Change INT


	-- GET VARIABLES HERE
	DECLARE @Json_Object VARCHAR(MAX)
	SELECT @Json_Object = (SELECT TOP(1) Custom_Alert_Levels FROM @Temp_Patient_Alert_Level)


	DECLARE @ErrorMessage NVARCHAR(200)
	SELECT @ErrorMessage = 'Yellow_Weight_Change:' + CAST(ISJSON(@Json_Object) AS NVARCHAR(200));
	RAISERROR(@ErrorMessage, 15, 1)

	-- CHECK IF Custom_Weight_Alert is in JSON Object
	IF (@Json_Object IS NOT NULL AND ISJSON(@Json_Object) > 0 AND
		JSON_PATH_EXISTS(@Json_Object, '$.Custom_Weight_Alert.Red_Day_Frame') = 1 AND
		JSON_PATH_EXISTS(@Json_Object, '$.Custom_Weight_Alert.Yellow_Day_Frame') = 1 AND
		JSON_PATH_EXISTS(@Json_Object, '$.Custom_Weight_Alert.Red_Weight_Change') = 1 AND
		JSON_PATH_EXISTS(@Json_Object, '$.Custom_Weight_Alert.Yellow_Weight_Change') = 1)
	BEGIN
		DECLARE @Temp NVARCHAR(MAX)
		SELECT @TEMP = (JSON_VALUE(@Json_Object, '$.Custom_Weight_Alert.Red_Day_Frame'))
		SELECT @Red_Day_Frame = CAST(@TEMP AS INT)

		SELECT @TEMP = (JSON_VALUE(@Json_Object, '$.Custom_Weight_Alert.Yellow_Day_Frame'))
		SELECT @Yellow_Day_Frame = CAST(@TEMP AS INT)

		SELECT @TEMP = (JSON_VALUE(@Json_Object, '$.Custom_Weight_Alert.Red_Weight_Change'))
		SELECT @Red_Weight_Change = CAST(@TEMP AS INT)

		SELECT @TEMP = (JSON_VALUE(@Json_Object, '$.Custom_Weight_Alert.Yellow_Weight_Change'))
		SELECT @Yellow_Weight_Change = CAST(@TEMP AS INT)


		--DECLARE @ErrorMessage NVARCHAR(200)
		SELECT @ErrorMessage = 'Yellow_Weight_Change:' + CAST(@Yellow_Weight_Change AS NVARCHAR(200));
		RAISERROR(@ErrorMessage, 15, 1)

	END
	ELSE
	BEGIN
		SELECT @Red_Day_Frame = 5
		SELECT @Yellow_Day_Frame = 3
		SELECT @Red_Weight_Change = 3
		SELECT @Yellow_Weight_Change = 3
	END

	-- Make Day Changes Negative
	SELECT @Red_Day_Frame = @Red_Day_Frame * (-1)
	SELECT @Yellow_Day_Frame = @Yellow_Day_Frame * (-1)

	-- Get Current Time Stamp
	DECLARE @Current_Timestamp DATETIME
	SELECT @Current_Timestamp = CURRENT_TIMESTAMP

	DECLARE @Yellow_Days_Timestamp DATETIME
	SELECT @Yellow_Days_Timestamp = DATEADD(DAY, @Red_Day_Frame, @Current_Timestamp)

	DECLARE @Red_Days_Timestamp DATETIME
	SELECT @Red_Days_Timestamp = DATEADD(DAY, @Yellow_Day_Frame, @Current_Timestamp)


	-- GET PAST 5 Days MAX and MIN
    DECLARE @Yellow_Days_Max INT
	SELECT @Yellow_Days_Max = (SELECT MAX(WeightInPounds) FROM [dbo].[Patient_Weight] WHERE PatientID = @patientID AND DateTimeTaken <= @Current_Timestamp AND DateTimeTaken >= @Yellow_Days_Timestamp)

	DECLARE @Yellow_Days_Min INT
	SELECT @Yellow_Days_Min = (SELECT MIN(WeightInPounds) FROM [dbo].[Patient_Weight] WHERE PatientID = @patientID AND DateTimeTaken <= @Current_Timestamp AND DateTimeTaken >= @Yellow_Days_Timestamp)

	DECLARE @Red_Days_Max INT
	SELECT @Red_Days_Max = (SELECT MAX(WeightInPounds) FROM [dbo].[Patient_Weight] WHERE PatientID = @patientID AND DateTimeTaken <= @Current_Timestamp AND DateTimeTaken >= @Red_Days_Timestamp)

	DECLARE @Red_Days_Min INT
	SELECT @Red_Days_Min = (SELECT MIN(WeightInPounds) FROM [dbo].[Patient_Weight] WHERE PatientID = @patientID AND DateTimeTaken <= @Current_Timestamp AND DateTimeTaken >= @Red_Days_Timestamp)

	-- Default Alert Level to Green (0)
	DECLARE @Alert_Level INT
	SELECT @Alert_Level = 0

	-- ONLY CHECKS FOR WEIGHT GAIN!!!!
	-- IF 3 Day Max exists, so will 5 Day max...
	IF (@Red_Days_Max is not null AND @Red_Days_Min is not null)
	BEGIN
		IF (@Red_Days_Max - @Red_Days_Min >= @Red_Weight_Change)
		BEGIN
			SELECT @Alert_Level = 2
		END

	END

		-- IF 3 Day Max exists, so will 5 Day max...
	IF (@Yellow_Days_Max is not null AND @Yellow_Days_Min is not null AND @Alert_Level = 0)
	BEGIN
		IF (@Yellow_Days_Max - @Yellow_Days_Min >= @Yellow_Weight_Change)
		BEGIN
			SELECT @Alert_Level = 1
		END

	END

	IF EXISTS (SELECT 1 FROM @Temp_Patient_Alert_Level)
	BEGIN
		UPDATE [dbo].[Patient_Alert_Levels] SET Weight_Level = @Alert_Level WHERE PatientID = @patientID

	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[Patient_Alert_Levels]
		VALUES(@patientID, @Alert_Level, 0, 0, 0, '{}')

	END



	--DECLARE @ErrorMessage NVARCHAR(200)
	--SELECT @ErrorMessage = 'Current DateTime:' + CAST(@Yellow_Days_Timestamp AS NVARCHAR(200));
	--RAISERROR(@ErrorMessage, 15, 1)

END;




CREATE OR ALTER TRIGGER [dbo].[Patient_Heart_Rate_Alert]
ON [dbo].[Patient_Heart_Rate]
AFTER INSERT AS
BEGIN
    DECLARE @patientID INT
    SELECT @patientID = (SELECT TOP(1) PatientID FROM INSERTED)

	DECLARE @MaxDateTime DATETIME
	SELECT @MaxDateTime = (SELECT MAX(DateTimeTaken) FROM INSERTED)


	DECLARE @heartRate INT
	SELECT @heartRate = (SELECT TOP(1) HeartRateInBPM FROM INSERTED WHERE DateTimeTaken = @MaxDateTime)
    -- CHECK IF PATIENTID IS IN THE IN THE Patient_weight_alert table
	DECLARE @Temp_Patient_Alert_Level TABLE (UniqueID INT, PatientID INT, Weight_Level INT, Heart_Rate_Level INT, Blood_Oxygen_Level INT, Blood_Pressure_Level INT, Custom_Alert_Levels VARCHAR(MAX))

	INSERT INTO @Temp_Patient_Alert_Level SELECT * FROM [dbo].[Patient_Alert_Levels] WHERE PatientID = @patientID
	-- Default Alert Level to Green (0)
	DECLARE @Alert_Level INT
	SELECT @Alert_Level = 0
	IF (@heartRate > 120)
	BEGIN
		SELECT @Alert_Level = 2
	END
	IF (@heartRate > 100 AND @Alert_Level = 0)
	BEGIN
		SELECT @Alert_Level = 1
	END

		IF EXISTS (SELECT 1 FROM @Temp_Patient_Alert_Level)
	BEGIN
		UPDATE [dbo].[Patient_Alert_Levels] SET Heart_Rate_Level = @Alert_Level WHERE PatientID = @patientID
	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[Patient_Alert_Levels]
		VALUES(@patientID, 0, @Alert_Level, 0, 0, '{}')

	END

END;



CREATE OR ALTER TRIGGER [dbo].[Patient_Blood_Pressure_Alert]
ON [dbo].[Patient_Blood_Pressure]
AFTER INSERT AS
BEGIN
    DECLARE @patientID INT
    SELECT @patientID = (SELECT TOP(1) PatientID FROM INSERTED)

	DECLARE @MaxDateTime DATETIME
	SELECT @MaxDateTime = (SELECT MAX(DateTimeTaken) FROM INSERTED)

	DECLARE @systolicBP INT
	SELECT @systolicBP = (SELECT TOP(1) SystolicBloodPressureInMmHg FROM INSERTED WHERE DateTimeTaken = @MaxDateTime)

	DECLARE @diastolicBP INT
	SELECT @diastolicBP = (SELECT TOP(1) DiastolicBloodPressureInMmHg FROM INSERTED WHERE DateTimeTaken = @MaxDateTime)

	DECLARE @Temp_Patient_Alert_Level TABLE (UniqueID INT, PatientID INT, Weight_Level INT, Heart_Rate_Level INT, Blood_Oxygen_Level INT, Blood_Pressure_Level INT, Custom_Alert_Levels VARCHAR(MAX))

	INSERT INTO @Temp_Patient_Alert_Level SELECT * FROM [dbo].[Patient_Alert_Levels] WHERE PatientID = @patientID
	-- Default Alert Level to Green (0)
	DECLARE @Alert_Level INT
	SELECT @Alert_Level = 0

	IF (@systolicBP > 180 OR @diastolicBP > 100)
	BEGIN
		SELECT @Alert_Level = 2
	END

	IF (@systolicBP > 150 OR @diastolicBP > 90)
	BEGIN
		IF (@Alert_Level = 0)
		BEGIN
			SELECT @Alert_Level = 1
		END
	END

	IF EXISTS (SELECT 1 FROM @Temp_Patient_Alert_Level)
	BEGIN
		UPDATE [dbo].[Patient_Alert_Levels] SET Blood_Pressure_Level = @Alert_Level WHERE PatientID = @patientID
	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[Patient_Alert_Levels]
		VALUES(@patientID, 0, 0, 0, @Alert_Level, '{}')
	END
END;


CREATE OR ALTER TRIGGER [dbo].[Patient_Blood_Oxygen_Alert]
ON [dbo].[Patient_Blood_Oxygen]
AFTER INSERT AS
BEGIN
    DECLARE @patientID INT
    SELECT @patientID = (SELECT TOP(1) PatientID FROM INSERTED)

	DECLARE @MaxDateTime DATETIME
	SELECT @MaxDateTime = (SELECT MAX(DateTimeTaken) FROM INSERTED)

	DECLARE @bloodOxygen INT
	SELECT @bloodOxygen = (SELECT TOP(1) BloodOxygenLevelInPercentage FROM INSERTED WHERE DateTimeTaken = @MaxDateTime)

	DECLARE @Temp_Patient_Alert_Level TABLE (UniqueID INT, PatientID INT, Weight_Level INT, Heart_Rate_Level INT, Blood_Oxygen_Level INT, Blood_Pressure_Level INT, Custom_Alert_Levels VARCHAR(MAX))

	INSERT INTO @Temp_Patient_Alert_Level SELECT * FROM [dbo].[Patient_Alert_Levels] WHERE PatientID = @patientID
	-- Default Alert Level to Green (0)
	DECLARE @Alert_Level INT
	SELECT @Alert_Level = 0

	IF (@bloodOxygen <= 85)
	BEGIN
		SELECT @Alert_Level = 2
	END
	IF (@bloodOxygen <= 88 AND @Alert_Level = 0)
	BEGIN
		SELECT @Alert_Level = 1
	END

	IF EXISTS (SELECT 1 FROM @Temp_Patient_Alert_Level)
	BEGIN
		UPDATE [dbo].[Patient_Alert_Levels] SET Blood_Oxygen_Level = @Alert_Level WHERE PatientID = @patientID
	END
	ELSE
	BEGIN
		INSERT INTO [dbo].[Patient_Alert_Levels]
		VALUES(@patientID, 0, 0, @Alert_Level, 0, '{}')
	END
END;
