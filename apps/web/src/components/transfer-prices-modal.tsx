"use client";

import { Modal } from "./modal";
import { Card } from "./card";

interface TransferPricesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TransferPricesModal({ isOpen, onClose }: TransferPricesModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Transfer Prices" maxWidth="max-w-5xl">
      <div className="space-y-6">
        {/* Important Disclaimers */}
        <Card className="p-6 bg-[var(--color-navy)]/5 border-2 border-[var(--color-navy)]/20">
          <h4 className="font-semibold text-[var(--color-navy)] mb-3 uppercase text-sm">Important Information</h4>
          <ul className="space-y-2 text-sm text-[var(--color-text-muted)]">
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-gold)] mt-1">•</span>
              <span>All boat services are dependent on weather conditions - delays may occur due to weather.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-gold)] mt-1">•</span>
              <span>No boat services will be provided before sunrise and after sunset.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-gold)] mt-1">•</span>
              <span>By booking a boat transfer, guests accept that Dolphin Blue Paradise is not liable for any accidents, weather-related discomfort, or guest belongings.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-gold)] mt-1">•</span>
              <span>Guests must wear a life vest and follow all Captain&apos;s instructions.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[var(--color-gold)] mt-1">•</span>
              <span>As a service to our hotel guests, we aim to keep transfer costs as close to cost as possible. Depending on weather & occupancy, we may not be able to provide taxi services that are not related to tours, arrival & departure transfers.</span>
            </li>
          </ul>
        </Card>

        {/* Pricing Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-lg">
            <thead>
              <tr className="bg-[var(--color-navy)] text-white">
                <th className="p-4 text-left font-semibold text-sm uppercase">Route</th>
                <th className="p-4 text-center font-semibold text-sm uppercase">Up to 2 People<br/><span className="text-xs font-normal">One Way</span></th>
                <th className="p-4 text-center font-semibold text-sm uppercase">Extra Person<br/><span className="text-xs font-normal">Same Group/Family Return</span></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-[var(--color-sand)]">
                <td className="p-4 font-medium text-[var(--color-navy)]">Transfer guests DBP to Bocas Dock return</td>
                <td className="p-4 text-center">$90</td>
                <td className="p-4 text-center">$60</td>
              </tr>
              <tr className="border-b border-[var(--color-sand)] bg-white/50">
                <td className="p-4 font-medium text-[var(--color-navy)]">Transfer guests DBP to Almirante return</td>
                <td className="p-4 text-center">$105</td>
                <td className="p-4 text-center">$70</td>
              </tr>
              <tr className="border-b border-[var(--color-sand)]">
                <td className="p-4 font-medium text-[var(--color-navy)]">Transfer Red Frog return</td>
                <td className="p-4 text-center">$160</td>
                <td className="p-4 text-center">$95</td>
              </tr>
              <tr className="border-b border-[var(--color-sand)] bg-white/50">
                <td className="p-4 font-medium text-[var(--color-navy)]">Transfer Unraca return</td>
                <td className="p-4 text-center">$150</td>
                <td className="p-4 text-center">$100</td>
              </tr>
              <tr className="border-b border-[var(--color-sand)]">
                <td className="p-4 font-medium text-[var(--color-navy)]">Transfer Isla Solarte return</td>
                <td className="p-4 text-center">$150</td>
                <td className="p-4 text-center">$100</td>
              </tr>
              <tr className="border-b border-[var(--color-sand)] bg-white/50">
                <td className="p-4 font-medium text-[var(--color-navy)]">Transfer Red Frog - DBP - Bocas</td>
                <td className="p-4 text-center">$115</td>
                <td className="p-4 text-center">$55</td>
              </tr>
              <tr className="border-b border-[var(--color-sand)]">
                <td className="p-4 font-medium text-[var(--color-navy)]">Transfer Almirante - DBP - Bocas</td>
                <td className="p-4 text-center">$105</td>
                <td className="p-4 text-center">$52</td>
              </tr>
              <tr className="border-b border-[var(--color-sand)] bg-white/50">
                <td className="p-4 font-medium text-[var(--color-navy)]">Transfer Isla Solarte - DBP - Bocas</td>
                <td className="p-4 text-center">$110</td>
                <td className="p-4 text-center">$55</td>
              </tr>
              <tr className="bg-white/50">
                <td className="p-4 font-medium text-[var(--color-navy)]">Transfer Unraca - DBP - Bocas</td>
                <td className="p-4 text-center">$125</td>
                <td className="p-4 text-center">$60</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <p className="text-sm text-[var(--color-text-muted)] italic text-center">
          All prices in USD. Prices subject to change based on weather conditions and availability.
        </p>
      </div>
    </Modal>
  );
}


