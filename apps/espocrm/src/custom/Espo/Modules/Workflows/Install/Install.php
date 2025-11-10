<?php

namespace Espo\Modules\Workflows\Install;

use Espo\Core\Installers\Base;

class Install extends Base
{
    public function afterInstall(): void
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
