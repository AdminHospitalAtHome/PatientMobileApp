CREATE TABLE Patient_Info (
	PatientID VARCHAR(20) NOT NULL PRIMARY KEY,
	FirstName VARCHAR(20) NOT NULL,
	LastName VARCHAR(20) NOT NULL,
	DateOfBirth DATE NOT NULL
);


-- Create Patient Weight Table
CREATE TABLE Patient_Weight (
	UniqueID INT IDENTITY(1,1) NOT NULL PRIMARY KEY, -- Unique ID for entry
	PatientID VARCHAR(20) FOREIGN KEY REFERENCES Patient_Info(PatientID), -- May change based on client Needs
	DateTimeTaken DateTime NOT NULL,
	WeightInPounds DECIMAL(4,1) NOT NULL, -- allows one decimal point and 3 numbers in fornt (e.g. 123.1)
	IfManualInput BIT NOT NULL -- 1 is yes, 0 if no
);