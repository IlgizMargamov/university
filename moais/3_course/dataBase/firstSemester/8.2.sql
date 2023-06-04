Create DATABASE Computers;

CREATE TABLE Computers.Comp
(
    CompID char(18)  NOT NULL ,
    CompName char(18)  NULL ,
    ProcNumber char(18)  NULL ,
    RamSizeGB char(18)  NULL ,
    ProcID char(18)  NOT NULL ,
    CompRoleID char(18)  NOT NULL ,
    RamType char(18)  NOT NULL
)
    ;


ALTER TABLE Comp
    ADD CONSTRAINT XPKComp PRIMARY KEY  (CompID)
    ;


CREATE TABLE Computers.Comp_HDD
(
    HDDNumber char(18)  NULL ,
    HDDModelID char(18)  NOT NULL ,
    CompID char(18)  NOT NULL
)
    ;


ALTER TABLE Comp_HDD
    ADD CONSTRAINT XPKComp_HDD PRIMARY KEY (HDDModelID ,CompID )
    ;


CREATE TABLE Computers.CompOS
(
    OSName char(18)  NOT NULL ,
    CompID char(18)  NOT NULL
)
    ;


ALTER TABLE CompOS
    ADD CONSTRAINT XPKCompOS PRIMARY KEY (OSName,CompID)
    ;


CREATE TABLE Computers.CompRole
(
    CompRoleID char(18)  NOT NULL ,
    CompRoleFullName char(18)  NULL
)
    ;


ALTER TABLE CompRole
    ADD CONSTRAINT XPKCompRole PRIMARY KEY (CompRoleID)
    ;


CREATE TABLE Computers.CompUser
(
    CompID char(18)  NOT NULL ,
    UserID char(18)  NOT NULL
)
    ;


ALTER TABLE CompUser
    ADD CONSTRAINT XPKCompUser PRIMARY KEY (CompID,UserID)
    ;


CREATE TABLE Computers.HDD
(
    HDDModelID char(18)  NOT NULL ,
    HDDModelFullName char(18)  NULL ,
    HDDVendor char(18)  NULL ,
    HDDSizeGB char(18)  NULL ,
    HDDInterface char(18)  NULL
)
    ;


ALTER TABLE HDD
    ADD CONSTRAINT XPKHDD PRIMARY KEY (HDDModelID )
    ;


CREATE TABLE Computers.NetDevice
(
    NetDeviceName char(18)  NULL ,
    NetDeviceId char(18)  NOT NULL ,
    NetDeviceType char(18)  NULL ,
    NetDeviceModel char(18)  NULL ,
    NetDeviceVendor char(18)  NULL ,
    NetDevicePortNumber char(18)  NULL
)
    ;


ALTER TABLE NetDevice
    ADD CONSTRAINT XPKNetDevice PRIMARY KEY (NetDeviceId )
    ;


CREATE TABLE Computers.NetInterface
(
    NetInterfaceId char(18)  NOT NULL ,
    NetInterfaceMAC char(18)  NULL ,
    NetInterfaceIP char(18)  NULL ,
    NetInterfaceInfo char(18)  NULL ,
    NetDeviceId char(18)  NOT NULL ,
    CompID char(18)  NOT NULL
)
    ;


ALTER TABLE NetInterface
    ADD CONSTRAINT XPKNetInterface PRIMARY KEY  (NetInterfaceId,CompID)
    ;


CREATE TABLE Computers.OS
(
    OSName char(18)  NOT NULL ,
    OSType char(18)  NULL ,
    OSVendor char(18)  NULL ,
    OSInfo char(18)  NULL
)
    ;


ALTER TABLE OS
    ADD CONSTRAINT XPKOS PRIMARY KEY (OSName )
    ;


CREATE TABLE Computers.RamType
(
    RamTypeFullName char(18)  NULL ,
    RamType char(18)  NOT NULL
)
    ;


ALTER TABLE Computers.RamType
    ADD CONSTRAINT XPKRamType PRIMARY KEY (RamType)
    ;


CREATE TABLE Computers.TProc
(
    ProcID char(18)  NOT NULL ,
    ProcFullName char(18)  NULL
)
    ;


ALTER TABLE Computers.TProc
    ADD CONSTRAINT XPKTProc PRIMARY KEY (ProcID )
    ;


CREATE TABLE Computers.TUser
(
    UserID char(18)  NOT NULL ,
    UserLogin char(18)  NULL ,
    UserFirstName char(18)  NULL ,
    UserLastName char(18)  NULL ,
    UserSecondName char(18)  NULL
)
    ;


ALTER TABLE Computers.TUser
    ADD CONSTRAINT XPKTUser PRIMARY KEY (UserID )
    ;


CREATE VIEW V_1(UserLogin,CompName)
AS
SELECT TUser.UserLogin,Comp.CompName
FROM Comp,TUser
    ;



ALTER TABLE Computers.Comp
    ADD CONSTRAINT  R_10 FOREIGN KEY (ProcID) REFERENCES TProc(ProcID)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    ;

ALTER TABLE Computers.Comp
    ADD CONSTRAINT  R_13 FOREIGN KEY (CompRoleID) REFERENCES CompRole(CompRoleID)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    ;

ALTER TABLE Computers.Comp
    ADD CONSTRAINT  R_14 FOREIGN KEY (RamType) REFERENCES RamType(RamType)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    ;



ALTER TABLE Computers.Comp_HDD
    ADD CONSTRAINT  R_6 FOREIGN KEY (HDDModelID) REFERENCES HDD(HDDModelID)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    ;

ALTER TABLE Computers.Comp_HDD
    ADD CONSTRAINT  R_7 FOREIGN KEY (CompID) REFERENCES Comp(CompID)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    ;



ALTER TABLE Computers.CompOS
    ADD CONSTRAINT  R_11 FOREIGN KEY (OSName) REFERENCES OS(OSName)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    ;

ALTER TABLE Computers.CompOS
    ADD CONSTRAINT  R_12 FOREIGN KEY (CompID) REFERENCES Comp(CompID)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    ;



ALTER TABLE Computers.CompUser
    ADD CONSTRAINT  R_8 FOREIGN KEY (CompID) REFERENCES Comp(CompID)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    ;

ALTER TABLE Computers.CompUser
    ADD CONSTRAINT  R_9 FOREIGN KEY (UserID) REFERENCES TUser(UserID)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    ;



ALTER TABLE Computers.NetInterface
    ADD CONSTRAINT  R_1 FOREIGN KEY (NetDeviceId) REFERENCES NetDevice(NetDeviceId)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    ;

ALTER TABLE Computers.NetInterface
    ADD CONSTRAINT  R_4 FOREIGN KEY (CompID) REFERENCES Comp(CompID)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
    ;

