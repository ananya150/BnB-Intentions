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

const ConfirmSwap = ({
  onOpen,
  loading,
  fromAsset,
  toAsset,
  fromAmount,
  toAmount,
  handleSwapConfirmationSubmit,
  handleSwapConfirmationCancle,
  chain,
}: any) => {
  return (
    <Dialog open={onOpen} modal={true}>
      <DialogContent
        className="sm:max-w-[650px]"
        onEscapeKeyDown={handleSwapConfirmationCancle}
      >
        <DialogHeader>
          <DialogTitle className="text-[24px]">Confirm Swap</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-8">
          <DialogDescription>
            Swapping {fromAmount} {fromAsset} to {toAmount} {toAsset} on {chain}{" "}
            chain.
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
                onClick={handleSwapConfirmationCancle}
                className="bg-red-500 hover:bg-red-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSwapConfirmationSubmit}
                className="bg-green-500 hover:bg-green-600"
              >
                Swap
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmSwap;
