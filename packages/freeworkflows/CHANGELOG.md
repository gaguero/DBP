# Changelog

All notable changes to the FreeWorkflows extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2025-01-27

### Added
- Initial release of FreeWorkflows extension
- Graphical workflow editor using React Flow
- Support for multiple trigger types:
  - Record Created/Updated/Deleted
  - Property Changed
  - Form Submission
  - Email events (Opened, Clicked, Bounced, Replied)
  - Scheduled triggers (Specific Date/Time, Relative Date, Recurring Schedule)
  - Contact enrollment events
- Conditional logic support
- Workflow actions:
  - Create Record
  - Update Record
- Workflow execution engine
- Execution logging and monitoring
- Scheduled job support for:
  - Process Workflow Execution (every minute)
  - Process Scheduled Workflows (every 5 minutes)
  - Process Recurring Workflows (every 10 minutes)
- Multi-language support (English, Spanish)
- Workflow statistics and recent logs panels
- Workflow activation/pause functionality
- Workflow duplication

### Technical Details
- Built for EspoCRM >= 9.2.0
- Requires PHP >= 8.1.0
- Uses EspoCRM extension packaging system
- Includes AfterInstall and AfterUninstall scripts
- Automatic scheduled job registration

[1.0.0]: https://github.com/your-repo/freeworkflows/releases/tag/1.0.0

