export interface WalletDto {
  tracking_wallet_address: string;
  alias: string;
}

export interface CreateWalletDto {
  tracking_wallet_address: string;
  alias: string;
  notes: string;
}
