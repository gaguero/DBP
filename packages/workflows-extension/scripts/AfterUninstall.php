<?php\n\nuse Espo\\Core\\Container;\n\nreturn function (Container ): void {\n    ->get('dataCacheManager')->clearAll();\n    ->get('rebuildManager')->rebuild(false);\n};\n
