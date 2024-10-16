import { SwapPage } from "./pages/SwapPage";
import { cn, background, color } from "@prex0/uikit/styles";

const App = () => {
  return (<div className={cn(background.default, color.foreground, 'h-full')}>
    <SwapPage />
  </div>
  )
}

export default App
