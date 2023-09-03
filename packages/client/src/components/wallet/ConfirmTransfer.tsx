"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import Image from "next/image";
import { BiLoaderCircle } from "react-icons/bi";

const ConfirmTransfer = ({
  loading,
  onOpen,
  assetName,
  to,
  amount,
  handleTransferConfirmationSubmit,
  handleTransferConfirmationCancle,
  chain,
}: any) => {
  return (
    <Dialog open={onOpen} modal={true}>
      <DialogContent
        className="sm:max-w-[650px]"
        onEscapeKeyDown={handleTransferConfirmationCancle}
      >
        <DialogHeader>
          <DialogTitle className="text-[24px]">Confirm Transfer</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-8">
          <DialogDescription>
            Transferring {amount} {assetName} to {to} on {chain}
          </DialogDescription>
        </div>
        <DialogFooter className="flex justify-between w-full">
          {loading ? (
            <div>
              <BiLoaderCircle className=" animate-spin w-9 h-9" />
            </div>
          ) : (
            <div className="flex justify-between w-full">
              <Button
                onClick={handleTransferConfirmationCancle}
                className="bg-red-500 hover:bg-red-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleTransferConfirmationSubmit}
                className="bg-green-500 hover:bg-green-600"
              >
                Transfer
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmTransfer;
