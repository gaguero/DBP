/************************************************************************
This file is part of the Dubas Shipping Manager - EspoCRM extension.

DUBAS S.C. - contact@dubas.pro
Copyright (C) 2022 Arkadiy Asuratov, Emil Dubielecki

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
************************************************************************/

Espo.define('dubas-shipping-manager:views/dubas-package/detail', 'views/detail', function (Dep) {

    return Dep.extend({

        setup: function () {
            Dep.prototype.setup.call(this);

            this.addMenuItem('buttons', {
                name: 'changeStatus',
                label: 'Change status',
                action: 'changeStatus',
                acl: 'edit',
                style: 'primary'
            }, true);
        },

        afterRender: function () {
            Dep.prototype.afterRender.call(this);
        },

        actionChangeStatus: function () {
            var attributes = {};
            var packageNames = {};

            packageNames[this.model.get('id')] = this.model.get('name');
            attributes.packagesIds = [this.model.get('id')];
            attributes.packagesNames = packageNames;

            var viewName = this.getMetadata().get('clientDefs.DubasPackageStatus.modalViews.edit') || 'views/modals/edit';

            this.notify('Loading...');
            this.createView('quickCreate', viewName, {
                scope: 'DubasPackageStatus',
                attributes: attributes,
            }, function (view) {
                view.render();
                view.notify(false);
                view.once('after:save', function () {
                    view.close();
                    this.notify('Status changed', 'success');
                }.bind(this));
            }.bind(this));
        }

    });
});
