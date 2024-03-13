CREATE TABLE Patient_Info (
	PatientID INT NOT NULL PRIMARY KEY,
	FirstName VARCHAR(20) NOT NULL,
	LastName VARCHAR(20) NOT NULL,
	DateOfBirth DATE NOT NULL,
	IfAccessibilityMode BIT
);

create table Provider_Info(
    ProviderId INT NOT NULL PRIMARY KEY,
    FirstName varchar(20) NOT NULL,
    LastName varchar(20) NOT NULL
);


-- Create Patient Weight Table
CREATE TABLE Patient_Weight (
	UniqueID INT IDENTITY(1,1) NOT NULL PRIMARY KEY, -- Unique ID for entry
	PatientID INT FOREIGN KEY REFERENCES Patient_Info(PatientID), -- May change based on client Needs
	DateTimeTaken DateTime NOT NULL,
	WeightInPounds INT NOT NULL,
	IfManualInput BIT NOT NULL -- 1 is yes, 0 if no
);

-- Create Blood Pressure Table
CREATE TABLE Patient_Blood_Pressure (
	UniqueID INT IDENTITY(1,1) NOT NULL PRIMARY KEY, -- Unique ID for entry
	PatientID INT FOREIGN KEY REFERENCES Patient_Info(PatientID), -- May change based on client Needs
	DateTimeTaken DateTime NOT NULL,
	SystolicBloodPressureInMmHg Int NOT NULL,
	DiastolicBloodPressureInMmHg Int NOT NULL,
	IfManualInput BIT NOT NULL -- 1 is yes, 0 if no
)

-- Create Blood Oxygen Level Table
CREATE TABLE Patient_Blood_Oxygen (
	UniqueID INT IDENTITY(1,1) NOT NULL PRIMARY KEY, -- Unique ID for entry
	PatientID INT FOREIGN KEY REFERENCES Patient_Info(PatientID), -- May change based on client Needs
	DateTimeTaken DateTime NOT NULL,
	BloodOxygenLevelInPercentage Int NOT NULL,
	IfManualInput BIT NOT NULL -- 1 is yes, 0 if no
)

-- Create Heart Rate Table
CREATE TABLE Patient_Heart_Rate (
	UniqueID INT IDENTITY(1,1) NOT NULL PRIMARY KEY, -- Unique ID for entry
	PatientID INT FOREIGN KEY REFERENCES Patient_Info(PatientID), -- May change based on client Needs
	DateTimeTaken DateTime NOT NULL,
	HeartRateInBPM Int NOT NULL,
	IfManualInput BIT NOT NULL -- 1 is yes, 0 if no
)

-- Create Alert Level Table
CREATE TABLE Patient_Alert_Levels (
	UniqueID INT IDENTITY(1,1) NOT NULL PRIMARY KEY, -- Unique ID for entry
	PatientID INT FOREIGN KEY REFERENCES Patient_Info(PatientID), -- May change based on client Needs
	Weight_Level INT, -- Check for Null when using
	Should_Trigger_Weight BIT,
	Heart_Rate_Level INT, -- 0 is Green, 2 is Red, 1 is Yellow
	Should_Trigger_Heart_Rate BIT, -- 1 if it should trigger an alert for web page
	Blood_Oxygen_Level INT,
	Should_Trigger_Blood_Oxygen BIT,
	Blood_Pressure_Level INT,
	Should_Trigger_Blood_Pressure BIT,
	Custom_Alert_Levels VARCHAR(MAX),
	VersionCol rowversion,
	CONSTRAINT PatientID_Unique UNIQUE(PatientID)
)

ALTER DATABASE [hospital-at-home-db]
SET CHANGE_TRACKING = ON
(CHANGE_RETENTION = 30 Minutes, AUTO_CLEANUP = ON)

ALTER TABLE [dbo].[Patient_Alert_Levels]
ENABLE CHANGE_TRACKING
WITH (TRACK_COLUMNS_UPDATED = ON);
