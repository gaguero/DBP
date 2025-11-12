<?php

/*
 * This file is part of the Dubas Shipping Manager - EspoCRM extension.
 *
 * DUBAS S.C. - contact@dubas.pro
 * Copyright (C) 2022 Arkadiy Asuratov, Emil Dubielecki
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

namespace Espo\Modules\DubasShippingManager\Hooks\DubasPackageStatus;

use Espo\ORM\Entity;
use Espo\ORM\EntityManager;

class SetPackageStatus
{
    protected $entityManager;

    public function __construct(EntityManager $entityManager)
    {
        $this->entityManager = $entityManager;
    }

    public function beforeSave(Entity $entity, array $options, array $data): void
    {
        if ($entity->isNew() || ($entity->isAttributeChanged('name') || $entity->isAttributeChanged('packagesIds'))) {
            $packages = $entity->get('packagesIds');
            foreach ($packages as $package) {
                $p = null;
                $p = $this->entityManager->getEntity('DubasPackage', $package);
                $p->set('status', $entity->get('name'));

                if ($entity->get('name') === 'Collected' && !$p->get('pickupDate')) {
                    $p->set('pickupDate', date('Y-m-d'));
                }

                if ($entity->get('name') === 'Delivered' && !$p->get('deliveryDate')) {
                    $p->set('deliveryDate', date('Y-m-d'));
                }

                $this->entityManager->saveEntity($p);
            }
        }
    }
}
