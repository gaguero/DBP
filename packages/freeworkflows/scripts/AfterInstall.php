<?php

/**
 * FreeWorkflows Extension - After Install Script
 * Enhanced with detailed logging for Railway deployment and debugging
 * 
 * This script runs after the extension is installed.
 * It configures the system, adds tabs, and clears caches.
 */
class AfterInstall
{
    protected $container;

    public function run($container)
    {
        $this->container = $container;
        $this->log('=== FreeWorkflows Installation Started ===');
        
        try {
            $this->log('Step 1: Adding Workflow to tabs...');
            $this->addToTabs();
            
            $this->log('Step 2: Clearing cache...');
            $this->clearCache();
            
            $this->log('Step 3: Rebuilding system...');
            $this->rebuild();
            
            $this->log('Step 4: Verifying installation...');
            $this->verifyInstallation();
            
            $this->log('=== FreeWorkflows Installation Completed Successfully ===');
        } catch (\Exception $e) {
            $this->log('ERROR: Installation failed - ' . $e->getMessage());
            $this->log('Stack trace: ' . $e->getTraceAsString());
            throw $e;
        }
    }

    protected function addToTabs()
    {
        try {
            $config = $this->container->get('config');
            
            // Get current tabList
            $tabList = $config->get('tabList', []);
            $this->log('Current tabList: ' . json_encode($tabList));
            
            // Add Workflow to tabList if not already present
            if (!in_array('Workflow', $tabList)) {
                $tabList[] = 'Workflow';
                $config->set('tabList', $tabList);
                $config->save();
                $this->log('✓ Added Workflow to tabList');
            } else {
                $this->log('- Workflow already in tabList');
            }
            
            // Get current quickCreateList
            $quickCreateList = $config->get('quickCreateList', []);
            $this->log('Current quickCreateList: ' . json_encode($quickCreateList));
            
            // Add Workflow to quickCreateList if not already present
            if (!in_array('Workflow', $quickCreateList)) {
                $quickCreateList[] = 'Workflow';
                $config->set('quickCreateList', $quickCreateList);
                $config->save();
                $this->log('✓ Added Workflow to quickCreateList');
            } else {
                $this->log('- Workflow already in quickCreateList');
            }
            
        } catch (\Exception $e) {
            $this->log('ERROR in addToTabs: ' . $e->getMessage());
            throw $e;
        }
    }

    protected function clearCache()
    {
        try {
            $this->container->get('dataManager')->clearCache();
            $this->log('✓ Cache cleared successfully');
        } catch (\Exception $e) {
            $this->log('ERROR clearing cache: ' . $e->getMessage());
            throw $e;
        }
    }

    protected function rebuild()
    {
        try {
            $this->container->get('dataManager')->rebuild();
            $this->log('✓ System rebuilt successfully');
        } catch (\Exception $e) {
            $this->log('ERROR rebuilding: ' . $e->getMessage());
            throw $e;
        }
    }

    protected function verifyInstallation()
    {
        try {
            $metadata = $this->container->get('metadata');
            
            // Check if Workflow scope exists
            $scopes = $metadata->get(['scopes']);
            if (isset($scopes['Workflow'])) {
                $this->log('✓ Workflow scope registered: ' . json_encode($scopes['Workflow']));
            } else {
                $this->log('WARNING: Workflow scope NOT found in metadata');
            }
            
            // Check if client defs exist
            $clientDefs = $metadata->get(['clientDefs', 'Workflow']);
            if ($clientDefs) {
                $this->log('✓ Workflow clientDefs registered');
                $this->log('  - Controller: ' . ($clientDefs['controller'] ?? 'not set'));
                $this->log('  - Views: ' . json_encode($clientDefs['views'] ?? []));
            } else {
                $this->log('WARNING: Workflow clientDefs NOT found');
            }
            
            // Check config
            $config = $this->container->get('config');
            $tabList = $config->get('tabList', []);
            if (in_array('Workflow', $tabList)) {
                $this->log('✓ Workflow in tabList');
            } else {
                $this->log('WARNING: Workflow NOT in tabList');
            }
            
        } catch (\Exception $e) {
            $this->log('ERROR verifying installation: ' . $e->getMessage());
        }
    }

    protected function log($message)
    {
        // Log to error_log (visible in Railway logs and Apache error logs)
        error_log('[FreeWorkflows] ' . $message);
        
        // Also try to log to EspoCRM log if available
        try {
            if (isset($GLOBALS['log'])) {
                $GLOBALS['log']->info('[FreeWorkflows] ' . $message);
            }
        } catch (\Exception $e) {
            // Silently ignore if EspoCRM log not available
        }
    }
}
