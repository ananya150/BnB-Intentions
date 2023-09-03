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

const ConfirmBridge = ({
  onOpen,
  loading,
  fromChain,
  toChain,
  busdAmount,
  handleBridgeConfirmationSubmit,
  handleBridgeConfirmationCancle,
}: any) => {
  return (
    <Dialog open={onOpen} modal={true}>
      <DialogContent
        className="sm:max-w-[650px]"
        onEscapeKeyDown={handleBridgeConfirmationCancle}
      >
        <DialogHeader>
          <DialogTitle className="text-[24px]">Confirm Bridge</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-8">
          <DialogDescription>
            Swapping {busdAmount} BUSD from {fromChain} to{" "}
            {(parseFloat(busdAmount) * 0.9975).toFixed(6)} BUSD on {toChain}
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
                onClick={handleBridgeConfirmationCancle}
                className="bg-red-500 hover:bg-red-600"
              >
                Cancel
              </Button>
              <Button
                onClick={handleBridgeConfirmationSubmit}
                className="bg-green-500 hover:bg-green-600"
              >
                Bridge
              </Button>
            </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmBridge;
