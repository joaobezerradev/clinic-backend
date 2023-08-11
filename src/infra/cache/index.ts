import { Module } from "@infra/shared/interfaces";

export class CacheModule implements Module {
  start(): Promise<void> {
    throw new Error("Method not implemented.");
  }
}
