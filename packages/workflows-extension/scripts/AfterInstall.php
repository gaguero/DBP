<?php

use Espo\Core\Container;
use Espo\Core\Utils\Config\ConfigWriter;

return function (Container $container): void {
    $config = $container->get('config');
    $configWriter = $container->get('injectableFactory')->create(ConfigWriter::class);

    $tabList = $config->get('tabList') ?? [];
    if (!in_array('Workflow', $tabList, true)) {
        $tabList[] = 'Workflow';
        $configWriter->set('tabList', $tabList);
    }

    $quickCreateList = $config->get('quickCreateList') ?? [];
    if (!in_array('Workflow', $quickCreateList, true)) {
        $quickCreateList[] = 'Workflow';
        $configWriter->set('quickCreateList', $quickCreateList);
    }

    $configWriter->save();

    $container->get('dataCacheManager')->clearAll();
    $container->get('rebuildManager')->rebuild(false);
};
