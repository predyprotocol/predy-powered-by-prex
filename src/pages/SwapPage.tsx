import { Swap, SwapToggleButton, SwapButton, SwapMessage, SwapAmountSimpleInput, SwapBalance, SwapTokenSelector } from "@prex0/uikit/swap"
import { Header } from "../components/Header"
import { Footer } from "../components/Footer"
import { ArrowDown, Info, Zap } from "lucide-react"
import { USDC_TOKEN, WETH_TOKEN } from "../constants";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Token } from "@prex0/prex-client"

export function SwapPage() {
  return <div className="min-h-screen bg-prex-default text-gray-300 flex flex-col">
      <Header />
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <Swap>

        <Card className="w-full max-w-md bg-black/50 backdrop-blur-md shadow-2xl border-gray-800/50">
          <CardContent className="space-y-4 pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Efficient. Streamlined. Redefined.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from-amount" className="text-gray-400">You pay</Label>
                <div className="flex space-x-2">
                  <SwapAmountSimpleInput type="from" amount="0" className="h-10 bg-black/30 border border-gray-800/50 text-gray-300 rounded-md"/>
                  <SwapTokenSelector
                    type="from"
                    token={USDC_TOKEN}
                  >
                    <TokenSelector />
                  </SwapTokenSelector>
                </div>
                <div>
                  <SwapBalance type="from" className="text-gray-400 text-sm"/>
                </div>
              </div>
              <div className="flex justify-center items-center space-x-2">
                <SwapToggleButton className="h-6 w-6">
                  <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50">
                    <ArrowDown className="h-4 w-4 text-gray-500" />
                    <span className="sr-only">Switch tokens</span>
                  </Button>
                  </SwapToggleButton>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div className="flex items-center space-x-1 text-xs text-gray-500 bg-white/5 px-2 py-1 rounded-full">
                        <span>No</span>
                        <Zap className="h-3 w-3" />
                        <span>with Intent Order</span>
                        <Info className="h-3 w-3" />
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>This transaction uses Intent Orders, eliminating gas fees for users.</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="space-y-2">
                <Label htmlFor="to-amount" className="text-gray-400">You receive</Label>
                <div className="flex space-x-2">
                  <SwapAmountSimpleInput type="to" amount="0" className="bg-black/30 border border-gray-800/50 text-gray-300 rounded-md"/>
                  <SwapTokenSelector
                    type="to"
                    token={WETH_TOKEN}
                  >
                    <TokenSelector />
                  </SwapTokenSelector>
                </div>
                <div>
                  <SwapBalance type="to" className="text-gray-400 text-sm"/>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col pt-6">
            <SwapMessage className="text-xs text-gray-500"/>
            <SwapButton className="w-full bg-white/5 hover:bg-white/10 border border-gray-700 rounded-md"/>
          </CardFooter>
        </Card>
        </Swap>
      </main>
      <Footer />
  </div>
}

function TokenSelector({
  token,
  setToken,
  options
}: {
  token?: Token;
  setToken?: (token: Token) => void;
  options?: Token[];
}) {
  if (!options || !setToken || !token) {
    return null;
  }

  return (
    <Select value={token.symbol} onValueChange={(value) => setToken(options.find((t) => t.symbol === value)!)}>
      <SelectTrigger className="w-[120px] bg-black/30 border-gray-800/50 text-gray-300">
        <SelectValue placeholder="Select token" />
      </SelectTrigger>
      <SelectContent className="bg-gray-800 border border-gray-700 flex flex-col">
        {options.map((token) => (
          <SelectItem value={token.symbol} className="text-gray-200 hover:bg-gray-700 focus:bg-gray-700 focus:text-white">{token.symbol}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
