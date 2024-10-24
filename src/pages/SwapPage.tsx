import { Swap, SwapToggleButton, SwapButton, SwapMessage, SwapAmountSimpleInput, SwapTokenSelector, SwapBalance } from "@prex0/uikit/swap"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { ArrowDown, Info, Zap } from "lucide-react"
import { USDC_TOKEN, WETH_TOKEN } from "../constants";

export function SwapPage() {
  return <div className="min-h-screen bg-prex-default text-gray-300 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4 space-y-2">
        <Swap className="w-full space-y-2 max-w-md bg-black/50 backdrop-blur-md shadow-2xl border-gray-800 border-[0.5px]">
          <div className="text-center">
            <p className="text-sm text-gray-500">Efficient. Streamlined. Redefined.</p>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="text-gray-300">
                You pay
              </div>

              <div className="h-10 flex items-center space-x-2">
                <SwapAmountSimpleInput type="from" amount="0" className="h-10 bg-black/30 border-gray-800/50 text-gray-300"/>
                <SwapTokenSelector type="from" token={USDC_TOKEN} className="h-10 bg-black/30 border-gray-800/50 border-[1px] text-gray-300 cursor-pointer hover:bg-black/50"/>
              </div>

              <div>
                <SwapBalance type="from" className="text-gray-400 text-sm"/>
              </div>
            </div>

            <div className="flex justify-center items-center space-x-2">
              <SwapToggleButton className="h-5 w-5 p-1">
                <ArrowDown className="h-4 w-4"/>
              </SwapToggleButton>
              <div className="flex items-center space-x-1 text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                <span>No</span>
                <Zap className="h-3 w-3" />
                <span>with Intent Order</span>
                <Info className="h-3 w-3" />
              </div>
            </div>

            <div className="space-y-2">

              <div className="text-gray-300">
                You receive
              </div>

              <div className="flex space-x-2">
                <SwapAmountSimpleInput type="to" amount="0" className="bg-black/30 border-gray-800/50 text-gray-300"/>
                <SwapTokenSelector type="to" token={WETH_TOKEN} className="h-10 bg-black/30 border-gray-800/50 border-[1px] text-gray-300 cursor-pointer hover:bg-black/50"/>
              </div>

              <div>
                <SwapBalance type="to" className="text-gray-400 text-sm"/>
              </div>
            </div>

          </div>
          <div>
            <SwapMessage className="text-xs text-gray-500"/>
            <SwapButton className="w-full bg-white/5 hover:bg-white/10 border border-gray-700"/>
          </div>

        </Swap>
      </main>

      <Footer />
  </div>
}
