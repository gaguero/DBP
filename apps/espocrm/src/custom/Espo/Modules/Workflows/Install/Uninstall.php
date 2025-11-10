<?php

namespace Espo\Modules\Workflows\Install;

use Espo\Core\Installers\Base;

class Uninstall extends Base
{
    public function afterUninstall(): void
    {
        $this->clearCache();
        $this->rebuildMetadata();
    }

    private function clearCache(): void
    {
        $this->container->get('dataCacheManager')->clearAll();
    }

    private function rebuildMetadata(): void
    {
        $this->container->get('rebuildManager')->rebuild(false);
    }
}
