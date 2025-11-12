<?php

/**
 * FreeWorkflows Extension - After Uninstall Script
 * 
 * This script runs after the extension is uninstalled.
 * It removes the extension from tabs and clears caches.
 */
class AfterUninstall
{
    protected $container;

    public function run($container)
    {
        $this->container = $container;
        
        try {
            $this->removeFromTabs();
            $this->clearCache();
            $this->rebuild();
        } catch (\Exception $e) {
            $GLOBALS['log']->error('FreeWorkflows: Uninstallation failed: ' . $e->getMessage());
        }
    }

    protected function removeFromTabs()
    {
        try {
            $config = $this->container->get('config');
            
            // Remove Workflow from tabList
            $tabList = $config->get('tabList', []);
            $tabList = array_values(array_filter($tabList, function($item) {
                return $item !== 'Workflow';
            }));
            $config->set('tabList', $tabList);
            
            // Remove Workflow from quickCreateList
            $quickCreateList = $config->get('quickCreateList', []);
            $quickCreateList = array_values(array_filter($quickCreateList, function($item) {
                return $item !== 'Workflow';
            }));
            $config->set('quickCreateList', $quickCreateList);
            
            $config->save();
            
        } catch (\Exception $e) {
            $GLOBALS['log']->error('FreeWorkflows: Could not update tabs: ' . $e->getMessage());
        }
    }

    protected function clearCache()
    {
        try {
            $this->container->get('dataManager')->clearCache();
        } catch (\Exception $e) {
            $GLOBALS['log']->error('FreeWorkflows: Could not clear cache: ' . $e->getMessage());
        }
    }

    protected function rebuild()
    {
        try {
            $this->container->get('dataManager')->rebuild();
        } catch (\Exception $e) {
            $GLOBALS['log']->error('FreeWorkflows: Could not rebuild: ' . $e->getMessage());
        }
    }
}
