<?php

use Espo\Core\Container;
use Espo\Core\Utils\Config\ConfigWriter;

return function (Container $container): void {
    $config = $container->get('config');
    $configWriter = $container->get('injectableFactory')->create(ConfigWriter::class);

    $tabList = array_values(array_filter(
        $config->get('tabList') ?? [],
        fn (string $item): bool => $item !== 'Workflow'
    ));
    $configWriter->set('tabList', $tabList);

    $quickCreateList = array_values(array_filter(
        $config->get('quickCreateList') ?? [],
        fn (string $item): bool => $item !== 'Workflow'
    ));
    $configWriter->set('quickCreateList', $quickCreateList);

    $configWriter->save();

    $container->get('dataCacheManager')->clearAll();
    $container->get('rebuildManager')->rebuild(false);
};
