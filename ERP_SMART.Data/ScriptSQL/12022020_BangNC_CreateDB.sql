USE [ERP_SMART]
GO
/****** Object:  Table [dbo].[Sys_Company]    Script Date: 12/2/2020 11:07:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Company](
	[CompanyId] [uniqueidentifier] NOT NULL,
	[CompanyParentId] [uniqueidentifier] NOT NULL,
	[CompanyCode] [nvarchar](125) NOT NULL,
	[CompanyName] [nvarchar](256) NOT NULL,
	[Description] [nvarchar](512) NULL,
	[TableofContents] [nvarchar](max) NOT NULL,
	[Address] [nvarchar](512) NULL,
	[Phone] [nvarchar](20) NULL,
	[IsActive] [bit] NOT NULL,
	[CreateDate] [date] NOT NULL,
	[UpdateDate] [date] NOT NULL,
	[CreateUser] [uniqueidentifier] NOT NULL,
	[UpdateUser] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Sys_Company] PRIMARY KEY CLUSTERED 
(
	[CompanyId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sys_Function]    Script Date: 12/2/2020 11:07:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Function](
	[FunctionId] [uniqueidentifier] NOT NULL,
	[ModuleId] [uniqueidentifier] NOT NULL,
	[FunctionCode] [nvarchar](125) NOT NULL,
	[FunctionName] [nvarchar](256) NOT NULL,
	[Description] [nchar](512) NULL,
	[Collacation] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[CreateDate] [date] NOT NULL,
	[UpdateDate] [date] NOT NULL,
	[CreateUserId] [uniqueidentifier] NOT NULL,
	[UpdateUserId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Sys_Function] PRIMARY KEY CLUSTERED 
(
	[FunctionId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sys_Menu]    Script Date: 12/2/2020 11:07:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Menu](
	[MenuId] [uniqueidentifier] NOT NULL,
	[ModuleId] [uniqueidentifier] NOT NULL,
	[MenuCode] [nvarchar](125) NOT NULL,
	[MenuName] [nvarchar](256) NOT NULL,
	[Url] [nvarchar](512) NOT NULL,
	[Icon] [nvarchar](50) NULL,
	[Collocation] [int] NOT NULL,
	[Description] [nvarchar](256) NULL,
	[IsActive] [bit] NOT NULL,
	[CreateDate] [date] NOT NULL,
	[UpdateDate] [date] NOT NULL,
	[CreateUser] [uniqueidentifier] NOT NULL,
	[UpdateUser] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Sys_Menu] PRIMARY KEY CLUSTERED 
(
	[MenuId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sys_Module]    Script Date: 12/2/2020 11:07:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Module](
	[ModuleId] [uniqueidentifier] NOT NULL,
	[ModuleCode] [nvarchar](125) NOT NULL,
	[ModuleName] [nvarchar](512) NOT NULL,
	[Collocation] [int] NOT NULL,
	[Description] [nvarchar](512) NULL,
	[IsActive] [bit] NOT NULL,
	[CreateDate] [date] NOT NULL,
	[UpdateDate] [date] NOT NULL,
	[CreateUserId] [uniqueidentifier] NOT NULL,
	[UpdateUserId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Sys_Module] PRIMARY KEY CLUSTERED 
(
	[ModuleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sys_Organization]    Script Date: 12/2/2020 11:07:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Organization](
	[OrganizationId] [uniqueidentifier] NOT NULL,
	[OrganizationParentId] [uniqueidentifier] NOT NULL,
	[OrganizationCode] [nvarchar](125) NOT NULL,
	[OrganizationName] [nvarchar](256) NOT NULL,
	[Description] [nvarchar](512) NULL,
	[TableofContents] [nvarchar](max) NOT NULL,
	[Address] [nvarchar](512) NULL,
	[Phone] [nvarchar](20) NULL,
	[IsActive] [bit] NOT NULL,
	[CreateDate] [date] NOT NULL,
	[UpdateDate] [date] NOT NULL,
	[CreateUserId] [uniqueidentifier] NOT NULL,
	[UpdateUserId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Sys_Organization] PRIMARY KEY CLUSTERED 
(
	[OrganizationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sys_Role]    Script Date: 12/2/2020 11:07:25 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Role](
	[RoleId] [uniqueidentifier] NOT NULL,
	[CompanyId] [uniqueidentifier] NOT NULL,
	[OrganizationId] [uniqueidentifier] NOT NULL,
	[RoleCode] [nvarchar](125) NOT NULL,
	[RoleName] [nvarchar](256) NOT NULL,
	[Collocation] [int] NOT NULL,
	[Description] [nvarchar](512) NULL,
	[CreateDate] [date] NOT NULL,
	[UpdateDate] [date] NOT NULL,
	[CreateUser] [uniqueidentifier] NOT NULL,
	[UpdateUser] [uniqueidentifier] NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_Sys_Role] PRIMARY KEY CLUSTERED 
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sys_Role_Module_Function]    Script Date: 12/2/2020 11:07:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Role_Module_Function](
	[RoleId] [uniqueidentifier] NOT NULL,
	[ModuleId] [uniqueidentifier] NOT NULL,
	[FunctionId] [uniqueidentifier] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sys_Role_Module_Menu]    Script Date: 12/2/2020 11:07:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_Role_Module_Menu](
	[RoleId] [uniqueidentifier] NULL,
	[ModuleId] [uniqueidentifier] NULL,
	[MenuId] [uniqueidentifier] NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sys_User]    Script Date: 12/2/2020 11:07:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_User](
	[UserId] [uniqueidentifier] NOT NULL,
	[UserName] [nvarchar](125) NOT NULL,
	[FullName] [nvarchar](125) NULL,
	[Password] [nvarchar](512) NOT NULL,
	[IsAdmin] [bit] NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Mobile] [nchar](20) NULL,
	[Avatar] [nvarchar](512) NOT NULL,
	[ClientId] [nvarchar](512) NULL,
	[IsActive] [bit] NOT NULL,
	[CreateDate] [date] NOT NULL,
	[UpdateDate] [date] NOT NULL,
	[CreateUserId] [uniqueidentifier] NOT NULL,
	[UpdateUserId] [uniqueidentifier] NOT NULL,
 CONSTRAINT [PK_Sys_User] PRIMARY KEY CLUSTERED 
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Sys_User_Company_Organization]    Script Date: 12/2/2020 11:07:26 AM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Sys_User_Company_Organization](
	[UserId] [uniqueidentifier] NULL,
	[CompanyId] [uniqueidentifier] NULL,
	[OrganizationId] [uniqueidentifier] NULL
) ON [PRIMARY]
GO
INSERT [dbo].[Sys_User] ([UserId], [UserName], [FullName], [Password], [IsAdmin], [Email], [Mobile], [Avatar], [ClientId], [IsActive], [CreateDate], [UpdateDate], [CreateUserId], [UpdateUserId]) VALUES (N'5f5931d3-b331-43d3-8312-04f70ad35f7f', N'bangnc', N'Ngô Công Bằng', N'X8qKO/JaXv11ebXWCUGgfg==', 1, N'bangnc85@gmail.com', NULL, N'Avatar', NULL, 0, CAST(N'2020-12-01' AS Date), CAST(N'2020-12-01' AS Date), N'5f5931d3-b331-43d3-8312-04f70ad35f7f', N'5f5931d3-b331-43d3-8312-04f70ad35f7f')
ALTER TABLE [dbo].[Sys_Function]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Function_Sys_Module_ModuleId] FOREIGN KEY([ModuleId])
REFERENCES [dbo].[Sys_Module] ([ModuleId])
GO
ALTER TABLE [dbo].[Sys_Function] CHECK CONSTRAINT [FK_Sys_Function_Sys_Module_ModuleId]
GO
ALTER TABLE [dbo].[Sys_Menu]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Menu_Sys_Module_ModuleId] FOREIGN KEY([ModuleId])
REFERENCES [dbo].[Sys_Module] ([ModuleId])
GO
ALTER TABLE [dbo].[Sys_Menu] CHECK CONSTRAINT [FK_Sys_Menu_Sys_Module_ModuleId]
GO
ALTER TABLE [dbo].[Sys_Role]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Role_Sys_Company_CompanyId] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Sys_Company] ([CompanyId])
GO
ALTER TABLE [dbo].[Sys_Role] CHECK CONSTRAINT [FK_Sys_Role_Sys_Company_CompanyId]
GO
ALTER TABLE [dbo].[Sys_Role]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Role_Sys_Organization_OrganizationId] FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[Sys_Organization] ([OrganizationId])
GO
ALTER TABLE [dbo].[Sys_Role] CHECK CONSTRAINT [FK_Sys_Role_Sys_Organization_OrganizationId]
GO
ALTER TABLE [dbo].[Sys_Role_Module_Function]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Role_Module_Function_Sys_Function_FunctionId] FOREIGN KEY([FunctionId])
REFERENCES [dbo].[Sys_Function] ([FunctionId])
GO
ALTER TABLE [dbo].[Sys_Role_Module_Function] CHECK CONSTRAINT [FK_Sys_Role_Module_Function_Sys_Function_FunctionId]
GO
ALTER TABLE [dbo].[Sys_Role_Module_Function]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Role_Module_Function_Sys_Module_ModuleId] FOREIGN KEY([ModuleId])
REFERENCES [dbo].[Sys_Module] ([ModuleId])
GO
ALTER TABLE [dbo].[Sys_Role_Module_Function] CHECK CONSTRAINT [FK_Sys_Role_Module_Function_Sys_Module_ModuleId]
GO
ALTER TABLE [dbo].[Sys_Role_Module_Function]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Role_Module_Function_Sys_Role_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Sys_Role] ([RoleId])
GO
ALTER TABLE [dbo].[Sys_Role_Module_Function] CHECK CONSTRAINT [FK_Sys_Role_Module_Function_Sys_Role_RoleId]
GO
ALTER TABLE [dbo].[Sys_Role_Module_Menu]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Role_Module_Menu_Sys_Menu_MenuId] FOREIGN KEY([MenuId])
REFERENCES [dbo].[Sys_Menu] ([MenuId])
GO
ALTER TABLE [dbo].[Sys_Role_Module_Menu] CHECK CONSTRAINT [FK_Sys_Role_Module_Menu_Sys_Menu_MenuId]
GO
ALTER TABLE [dbo].[Sys_Role_Module_Menu]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Role_Module_Menu_Sys_Module_ModuleId] FOREIGN KEY([ModuleId])
REFERENCES [dbo].[Sys_Module] ([ModuleId])
GO
ALTER TABLE [dbo].[Sys_Role_Module_Menu] CHECK CONSTRAINT [FK_Sys_Role_Module_Menu_Sys_Module_ModuleId]
GO
ALTER TABLE [dbo].[Sys_Role_Module_Menu]  WITH CHECK ADD  CONSTRAINT [FK_Sys_Role_Module_Menu_Sys_Role_RoleId] FOREIGN KEY([RoleId])
REFERENCES [dbo].[Sys_Role] ([RoleId])
GO
ALTER TABLE [dbo].[Sys_Role_Module_Menu] CHECK CONSTRAINT [FK_Sys_Role_Module_Menu_Sys_Role_RoleId]
GO
ALTER TABLE [dbo].[Sys_User_Company_Organization]  WITH CHECK ADD  CONSTRAINT [FK_Sys_User_Company_Organization_Sys_Company_CompanyId] FOREIGN KEY([CompanyId])
REFERENCES [dbo].[Sys_Company] ([CompanyId])
GO
ALTER TABLE [dbo].[Sys_User_Company_Organization] CHECK CONSTRAINT [FK_Sys_User_Company_Organization_Sys_Company_CompanyId]
GO
ALTER TABLE [dbo].[Sys_User_Company_Organization]  WITH CHECK ADD  CONSTRAINT [FK_Sys_User_Company_Organization_Sys_Organization_OrganizationId] FOREIGN KEY([OrganizationId])
REFERENCES [dbo].[Sys_Organization] ([OrganizationId])
GO
ALTER TABLE [dbo].[Sys_User_Company_Organization] CHECK CONSTRAINT [FK_Sys_User_Company_Organization_Sys_Organization_OrganizationId]
GO
ALTER TABLE [dbo].[Sys_User_Company_Organization]  WITH CHECK ADD  CONSTRAINT [FK_Sys_User_Company_Organization_Sys_User_UserId] FOREIGN KEY([UserId])
REFERENCES [dbo].[Sys_User] ([UserId])
GO
ALTER TABLE [dbo].[Sys_User_Company_Organization] CHECK CONSTRAINT [FK_Sys_User_Company_Organization_Sys_User_UserId]
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'So thu tu' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Sys_Module', @level2type=N'COLUMN',@level2name=N'Collocation'
GO
EXEC sys.sp_addextendedproperty @name=N'MS_Description', @value=N'Sap xep' , @level0type=N'SCHEMA',@level0name=N'dbo', @level1type=N'TABLE',@level1name=N'Sys_Role', @level2type=N'COLUMN',@level2name=N'Collocation'
GO
