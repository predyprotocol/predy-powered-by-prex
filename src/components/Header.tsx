import { ConnectButton } from "./ConnectButton";

export const Header = () => {
  return (
    <header className="bg-black/30 backdrop-blur-sm border-b border-gray-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <span className="text-xl font-light tracking-wide">PREDY</span>
        <span className="text-sm bg-white/10 px-2 py-1 rounded-md">∞.1</span>
        <span className="text-sm">Swap</span>
      </div>
      <div className="flex items-center space-x-4">

        <ConnectButton className="px-3 py-2 rounded-md w-full bg-white/5 hover:bg-white/10 border border-gray-800/50">
          Connect Wallet
        </ConnectButton>
      </div>
    </div>
  </header>

  );
};