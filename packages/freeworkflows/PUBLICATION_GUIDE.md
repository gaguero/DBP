# FreeWorkflows - Publication Guide

This document provides step-by-step instructions for publishing the FreeWorkflows extension to the EspoCRM community.

## Pre-Publication Checklist

- [x] Extension renamed to FreeWorkflows
- [x] Manifest.json updated with complete metadata
- [x] Installation scripts improved with logging and error handling
- [x] Scheduled jobs metadata created
- [x] Documentation created (README, CHANGELOG, QA_CHECKLIST)
- [x] Packaging scripts created (PowerShell and Bash)
- [x] Extension ZIP generated successfully

## Package Location

The extension package is located at:
```
packages/build/FreeWorkflows-1.0.0.zip
```

## Testing Before Publication

1. **Install in Clean EspoCRM Instance**
   - Use EspoCRM >= 9.2.0
   - PHP >= 8.1.0
   - Fresh installation recommended

2. **Follow QA Checklist**
   - See `QA_CHECKLIST.md` for complete testing procedures
   - Verify all functionality works as expected
   - Test installation and uninstallation

3. **Check Logs**
   - Review `data/logs/espo.log` for any errors
   - Verify scheduled jobs are created and running
   - Check browser console for JavaScript errors

## Publication Options

### Option 1: GitHub Releases (Recommended)

1. **Create GitHub Repository**
   - Repository name: `freeworkflows` or `espocrm-freeworkflows`
   - Description: "Free and open-source workflow automation system for EspoCRM"
   - License: GNU Affero General Public License v3.0
   - Topics: `espocrm`, `extension`, `workflow`, `automation`, `php`

2. **Prepare Repository Structure**
   ```
   freeworkflows/
   ├── README.md (main documentation)
   ├── CHANGELOG.md
   ├── LICENSE
   ├── packages/
   │   └── freeworkflows/
   │       ├── manifest.json
   │       ├── files/
   │       ├── scripts/
   │       └── ...
   └── build/
       └── FreeWorkflows-1.0.0.zip
   ```

3. **Create Release**
   - Tag: `v1.0.0`
   - Title: "FreeWorkflows 1.0.0 - Initial Release"
   - Description: Copy from CHANGELOG.md
   - Attach: `FreeWorkflows-1.0.0.zip`
   - Mark as "Latest release"

4. **Update README.md**
   - Add installation instructions
   - Add screenshots (if available)
   - Add link to releases page
   - Add contribution guidelines

### Option 2: EspoCRM Forum

1. **Create Forum Post**
   - Forum: Extensions & Integrations
   - Title: "FreeWorkflows - Free Workflow Automation Extension"
   - Include:
     - Description
     - Features list
     - Installation instructions
     - Screenshots/GIFs
     - Download link (GitHub Releases)

2. **Engage with Community**
   - Respond to questions
   - Provide support
   - Gather feedback

### Option 3: EspoCRM Marketplace (If Available)

1. **Submit Extension**
   - Follow EspoCRM marketplace guidelines
   - Provide all required information
   - Include screenshots and documentation

## Post-Publication Tasks

1. **Monitor Feedback**
   - Check GitHub issues
   - Monitor forum discussions
   - Respond to questions promptly

2. **Gather Usage Data**
   - Track downloads
   - Monitor error reports
   - Collect feature requests

3. **Plan Future Releases**
   - Address bug reports
   - Implement requested features
   - Update documentation

## Marketing Materials

### Short Description (for listings)
"Free and open-source workflow automation system for EspoCRM with graphical interface. Create powerful workflows with triggers, conditions, and actions without coding."

### Key Features (for marketing)
- Graphical workflow editor using React Flow
- Multiple trigger types (record events, email events, scheduled)
- Conditional logic support
- Workflow actions (create/update records)
- Execution logging and monitoring
- Scheduled workflow support
- Multi-language support (English, Spanish)

### Screenshots Needed
1. Workflow list view
2. Workflow editor (graphical interface)
3. Workflow detail view with statistics
4. Workflow logs view

## Version Management

- Use Semantic Versioning (MAJOR.MINOR.PATCH)
- Update CHANGELOG.md for each release
- Tag releases in Git
- Create GitHub releases for each version

## Support Channels

- GitHub Issues: For bug reports and feature requests
- EspoCRM Forum: For community discussions
- Email: [Your support email]

## License

This extension is released under the GNU Affero General Public License v3.0, same as EspoCRM.

## Next Steps

1. Test the extension thoroughly using QA_CHECKLIST.md
2. Create GitHub repository
3. Upload initial release
4. Announce on EspoCRM forum
5. Monitor and respond to feedback

