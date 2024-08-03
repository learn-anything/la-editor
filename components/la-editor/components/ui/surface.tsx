import * as React from 'react'
import { cn } from '@/lib/utils'

export type SurfaceProps = React.HTMLProps<HTMLDivElement>

export const Surface = React.forwardRef<HTMLDivElement, SurfaceProps>(({ children, className, ...props }, ref) => {
  return (
    <div
      className={cn('rounded-lg border bg-popover text-popover-foreground shadow-sm', className)}
      {...props}
      ref={ref}
    >
      {children}
    </div>
  )
})

Surface.displayName = 'Surface'
