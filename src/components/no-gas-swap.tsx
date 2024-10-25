import { ArrowDown, Info, Twitter, Github, Zap } from "lucide-react"
import { useState, useCallback, useEffect } from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Wallet balances simulation (実際の実装ではウォレット接続が必要です)
const walletBalances = {
  eth: "1.5",
  usdc: "1000",
  dai: "500"
}

export function NoGasSwap() {
  const [fromAmount, setFromAmount] = useState("")
  const [toAmount, setToAmount] = useState("")
  const [fromCurrency, setFromCurrency] = useState("eth")
  const [toCurrency, setToCurrency] = useState("usdc")
  const [fromBalance, setFromBalance] = useState(walletBalances.eth)
  const [toBalance, setToBalance] = useState(walletBalances.usdc)

  const handleNumberInput = useCallback((setter: React.Dispatch<React.SetStateAction<string>>) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value === '' || /^\d*\.?\d*$/.test(value)) {
      setter(value)
    }
  }, [])

  const handleFromCurrencyChange = useCallback((value: string) => {
    if (value === toCurrency) {
      setToCurrency(fromCurrency)
      setToBalance(walletBalances[fromCurrency as keyof typeof walletBalances])
    }
    setFromCurrency(value)
    setFromBalance(walletBalances[value as keyof typeof walletBalances])
  }, [toCurrency, fromCurrency])

  const handleToCurrencyChange = useCallback((value: string) => {
    if (value === fromCurrency) {
      setFromCurrency(toCurrency)
      setFromBalance(walletBalances[toCurrency as keyof typeof walletBalances])
    }
    setToCurrency(value)
    setToBalance(walletBalances[value as keyof typeof walletBalances])
  }, [fromCurrency, toCurrency])

  const handleSwap = useCallback(() => {
    setFromCurrency(toCurrency)
    setToCurrency(fromCurrency)
    setFromAmount("")
    setToAmount("")
    setFromBalance(walletBalances[toCurrency as keyof typeof walletBalances])
    setToBalance(walletBalances[fromCurrency as keyof typeof walletBalances])
  }, [fromCurrency, toCurrency])

  const handleMaxClick = useCallback(() => {
    if (fromBalance) {
      setFromAmount(fromBalance)
    }
  }, [fromBalance])

  useEffect(() => {
    setFromBalance(walletBalances[fromCurrency as keyof typeof walletBalances] || "")
  }, [fromCurrency])

  useEffect(() => {
    setToBalance(walletBalances[toCurrency as keyof typeof walletBalances] || "")
  }, [toCurrency])

  return (
    <div className="min-h-screen bg-[#0a0b0d] text-gray-300 flex flex-col">
      <header className="bg-black/30 backdrop-blur-sm border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="text-xl font-light tracking-wide font-inter">PREDY</span>
            <span className="text-sm bg-white/10 px-2 py-1 rounded-md">∞.1</span>
            <span className="text-sm">Swap</span>
          </div>
          <Button className="bg-white/5 text-gray-300 hover:bg-white/10 backdrop-blur-sm border border-gray-700">
            Connect Wallet
          </Button>
        </div>
      </header>
      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <Card className="w-full max-w-md bg-black/50 backdrop-blur-md shadow-2xl border-gray-800/50">
          <CardContent className="space-y-4 pt-6">
            <div className="text-center">
              <p className="text-sm text-gray-500">Efficient. Streamlined. Redefined.</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="from-amount" className="text-gray-400">You pay</Label>
                <div className="flex space-x-2">
                  <div className="relative flex-grow">
                    <Input
                      id="from-amount"
                      placeholder="0"
                      value={fromAmount}
                      onChange={handleNumberInput(setFromAmount)}
                      className="w-full bg-black/30 border-gray-800/50 text-gray-300 placeholder-gray-600 pr-12"
                    />
                    <button
                      onClick={handleMaxClick}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 hover:text-gray-200"
                      disabled={!fromCurrency}
                    >
                      Max
                    </button>
                  </div>
                  <Select value={fromCurrency} onValueChange={handleFromCurrencyChange}>
                    <SelectTrigger className="w-[120px] bg-black/30 border-gray-800/50 text-gray-300">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border border-gray-700">
                      <SelectItem value="eth" className="text-gray-200 hover:bg-gray-700 focus:bg-gray-700 focus:text-white">ETH</SelectItem>
                      <SelectItem value="usdc" className="text-gray-200 hover:bg-gray-700 focus:bg-gray-700 focus:text-white">USDC</SelectItem>
                      <SelectItem value="dai" className="text-gray-200 hover:bg-gray-700 focus:bg-gray-700 focus:text-white">DAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {fromBalance && (
                  <p className="text-sm text-gray-400 mt-1">Balance: {fromBalance} {fromCurrency.toUpperCase()}</p>
                )}
              </div>
              <div className="flex justify-center items-center space-x-2">
                <Button variant="ghost" size="icon" className="rounded-full bg-black/30 hover:bg-black/50" onClick={handleSwap}>
                  <ArrowDown className="h-4 w-4 text-gray-500" />
                  <span className="sr-only">Switch tokens</span>
                </Button>
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
                  <Input
                    id="to-amount"
                    placeholder="0"
                    value={toAmount}
                    onChange={handleNumberInput(setToAmount)}
                    className="flex-grow bg-black/30 border-gray-800/50 text-gray-300 placeholder-gray-600"
                  />
                  <Select value={toCurrency} onValueChange={handleToCurrencyChange}>
                    <SelectTrigger className="w-[120px] bg-black/30 border-gray-800/50 text-gray-300">
                      <SelectValue placeholder="Select token" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border border-gray-700">
                      <SelectItem value="eth" className="text-gray-200 hover:bg-gray-700 focus:bg-gray-700 focus:text-white">ETH</SelectItem>
                      <SelectItem value="usdc" className="text-gray-200 hover:bg-gray-700 focus:bg-gray-700 focus:text-white">USDC</SelectItem>
                      <SelectItem value="dai" className="text-gray-200 hover:bg-gray-700 focus:bg-gray-700 focus:text-white">DAI</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {toBalance && (
                  <p className="text-sm text-gray-400 mt-1">Balance: {toBalance} {toCurrency.toUpperCase()}</p>
                )}
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col pt-6">
            <Button className="w-full bg-white/5 text-gray-300 hover:bg-white/10 border border-gray-700" size="lg">
              Approve
            </Button>
          </CardFooter>
        </Card>
      </main>
      <footer className="bg-black/30 backdrop-blur-sm py-4 text-sm text-gray-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center space-x-6">
          <a href="https://x.com/predyfinance" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">X (Twitter)</span>
            <Twitter className="h-5 w-5" />
          </a>
          <a href="https://discord.gg/predy" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">Discord</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
            </svg>
          </a>
          <a href="https://predyfinance.medium.com/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">Medium</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19  5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z" />
            </svg>
          </a>
          <a href="https://github.com/predyprotocol" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-300">
            <span className="sr-only">GitHub</span>
            <Github className="h-5 w-5" />
          </a>
          <p>@Predy finance</p>
        </div>
      </footer>
    </div>
  )
}