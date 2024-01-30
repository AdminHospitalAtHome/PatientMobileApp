CREATE OR ALTER TRIGGER [dbo].[Patient_Weight_Alert]
ON [dbo].[Patient_Weight]
AFTER INSERT AS
BEGIN
    -- DECLARE @currentWeightAlert INT
    DECLARE @patientID INT
    SELECT @patientID = (SELECT TOP(1) PatientID FROM INSERTED)
    -- CHECK IF PATIENTID IS IN THE IN THE Patient_weight_alert table
	DECLARE @Temp_Patient_Alert_Level TABLE (UniqueID INT, PatientID INT, Weight_Level INT, Heart_Rate_Level INT, Blood_Oxygen_Level INT, Blood_Pressure_Level INT)

	INSERT INTO @Temp_Patient_Alert_Level SELECT * FROM [dbo].[Patient_Alert_Levels] WHERE PatientID = @patientID


	DECLARE @Temp_Weight TABLE(UniqueID INT, PatientID INT, DateTimeTaken DATETIME, WeightInPounds INT, IfManualInput BIT)

	-- Get Current Time Stamp
	DECLARE @Current_Timestamp DATETIME
	SELECT @Current_Timestamp = CURRENT_TIMESTAMP

	DECLARE @5_Day_Timestamp DATETIME
	SELECT @5_Day_Timestamp = DATEADD(DAY, -5, @Current_Timestamp)

	DECLARE @3_Day_Timestamp DATETIME
	SELECT @3_Day_Timestamp = DATEADD(DAY, -3, @Current_Timestamp)


	-- GET PAST 5 Days MAX and MIN
    DECLARE @5_Days_Max INT
	SELECT @5_Days_Max = (SELECT MAX(WeightInPounds) FROM [dbo].[Patient_Weight] WHERE PatientID = @patientID AND DateTimeTaken <= @Current_Timestamp AND DateTimeTaken >= @5_Day_Timestamp)

	DECLARE @5_Days_Min INT
	SELECT @5_Days_Min = (SELECT MIN(WeightInPounds) FROM [dbo].[Patient_Weight] WHERE PatientID = @patientID AND DateTimeTaken <= @Current_Timestamp AND DateTimeTaken >= @5_Day_Timestamp)

	DECLARE @3_Days_Max INT
	SELECT @3_Days_Max = (SELECT MAX(WeightInPounds) FROM [dbo].[Patient_Weight] WHERE PatientID = @patientID AND DateTimeTaken <= @Current_Timestamp AND DateTimeTaken >= @3_Day_Timestamp)

	DECLARE @3_Days_Min INT
	SELECT @3_Days_Min = (SELECT MIN(WeightInPounds) FROM [dbo].[Patient_Weight] WHERE PatientID = @patientID AND DateTimeTaken <= @Current_Timestamp AND DateTimeTaken >= @3_Day_Timestamp)

	-- Default Alert Level to Green (0)
	DECLARE @Alert_Level INT
	SELECT @Alert_Level = 0

	-- IF 3 Day Max exists, so will 5 Day max...
	IF (@3_Days_Max is not null AND @3_Days_Min is not null)
	BEGIN
		IF (@3_Days_Max - @3_Days_Min >= 3)
		BEGIN
			SELECT @Alert_Level = 2
		END

	END

		-- IF 3 Day Max exists, so will 5 Day max...
	IF (@5_Days_Max is not null AND @5_Days_Min is not null AND @Alert_Level = 0)
	BEGIN
		IF (@5_Days_Max - @5_Days_Min >= 3)
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
		VALUES(@patientID, @Alert_Level, 0, 0, 0)

	END



	--DECLARE @ErrorMessage NVARCHAR(200)
	--SELECT @ErrorMessage = 'Current DateTime:' + CAST(@5_Day_Timestamp AS NVARCHAR(200));
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
	DECLARE @Temp_Patient_Alert_Level TABLE (UniqueID INT, PatientID INT, Weight_Level INT, Heart_Rate_Level INT, Blood_Oxygen_Level INT, Blood_Pressure_Level INT)

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
		VALUES(@patientID, 0, @Alert_Level, 0, 0)

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

	DECLARE @Temp_Patient_Alert_Level TABLE (UniqueID INT, PatientID INT, Weight_Level INT, Heart_Rate_Level INT, Blood_Oxygen_Level INT, Blood_Pressure_Level INT)

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
		VALUES(@patientID, 0, 0, 0, @Alert_Level)
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

	DECLARE @Temp_Patient_Alert_Level TABLE (UniqueID INT, PatientID INT, Weight_Level INT, Heart_Rate_Level INT, Blood_Oxygen_Level INT, Blood_Pressure_Level INT)

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
		VALUES(@patientID, 0, 0, @Alert_Level, 0)
	END
END;
