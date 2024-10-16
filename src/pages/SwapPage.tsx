import { Swap, SwapAmountInput, SwapToggleButton, SwapButton, SwapMessage } from "@prex0/uikit/swap"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { Zap } from "lucide-react"

export function SwapPage() {
  return <div className="min-h-screen bg-prex-default text-gray-300 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4">

        <div className="m-2 flex items-center space-x-1 text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">
          <span>No</span>
          <Zap className="h-3 w-3" />
          <span>with Intent Order</span>
        </div>

        <Swap className="w-full max-w-lg bg-black/50 backdrop-blur-md shadow-2xl border-gray-800 border-[0.5px]">
            <SwapAmountInput label="You Pay" type='from' className="border-gray-300"/>
            <SwapToggleButton/>
            <SwapAmountInput label="You Receive" type='to' />
            <SwapButton className="w-full bg-white/5 hover:bg-white/10 border border-gray-700"/>
            <SwapMessage />
        </Swap>
      </main>
      <Footer />
  </div>
}
