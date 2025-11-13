"use client";

import { useState } from "react";
import { Button } from "./button";
import { TransferPricesModal } from "./transfer-prices-modal";

export function TransferPricesButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        variant="secondary"
        className="w-full md:w-auto"
      >
        View Transfer Prices
      </Button>
      <TransferPricesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}


