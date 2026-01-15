import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { 
  MousePointer, Pencil, Square, Circle, Minus, Type, 
  Trash2, Undo, ZoomIn, ZoomOut, Sparkles, Download, 
  Eraser, Triangle, Star, Diamond, Pentagon, Hexagon, 
  Shapes, ChevronDown, Sun, Moon 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { cn } from "@/lib/utils";
import { useTheme } from "@/contexts/ThemeContext";

// Define Tool type locally to prevent circular dependency with Canvas
export type Tool = 
  | "select" | "draw" | "eraser" | "rectangle" 
  | "circle" | "line" | "text" | "arrow" 
  | "triangle" | "ellipse" | "star" | "diamond" 
  | "pentagon" | "hexagon";

const ICON_SHORTCUTS: Record<string, string> = {
  select: '1', rectangle: 'r', diamond: 'd', circle: 'c',
  line: 'l', triangle: '3', draw: '2', text: 't',    
  eraser: '0', star: 's', pentagon: 'p', hexagon: 'h',
};

interface ToolbarProps {
  activeTool: Tool;
  onToolClick: (tool: Tool) => void;
  onClear: () => void;
  onUndo: () => void;
  onZoom: (direction: 'in' | 'out') => void;
  onShowAI: () => void;
  onShowExport: () => void;
  activeColor: string;
  onColorChange: (color: string) => void;
  strokeWidth: number;
  onStrokeWidthChange: (width: number) => void;
  canvas: any;
}

interface ToolButtonProps {
  isActive?: boolean;
  onClick: () => void;
  icon: React.ElementType;
  label: string;
  colorClass?: string;
  tooltip?: string;
  shortcut?: string;
}

const ToolButton: React.FC<ToolButtonProps> = ({ 
  isActive, onClick, icon: Icon, colorClass = "blue", shortcut
}) => (
  <HoverCard openDelay={300}>
    <HoverCardTrigger asChild>
      <Button
        variant={isActive ? "default" : "ghost"}
        size="sm"
        onClick={onClick}
        className={cn(
          "h-10 w-10 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 relative",
          isActive 
            ? `bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700 shadow-lg` 
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700/50 hover:shadow-md"
        )}
      >
        <Icon className="h-5 w-5" />
        {shortcut && (
          <span className="absolute -top-1 -right-1 bg-gray-800 dark:bg-gray-600 text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-medium">
            {shortcut}
          </span>
        )}
      </Button>
    </HoverCardTrigger>
  </HoverCard>
);

export const Toolbar = ({ 
  activeTool, onToolClick, onClear, onUndo, onZoom,
  onShowAI, onShowExport, activeColor, onColorChange,
  strokeWidth, onStrokeWidthChange
}: ToolbarProps) => {
  const { theme, toggleTheme } = useTheme();

  const basicTools = [
    { id: "select", icon: MousePointer, label: "Select" },
    { id: "draw", icon: Pencil, label: "Draw" },
    { id: "text", icon: Type, label: "Text" },
    { id: "eraser", icon: Eraser, label: "Eraser" },
  ];

  const shapes = [
    { id: "rectangle", icon: Square, label: "Rectangle" },
    { id: "circle", icon: Circle, label: "Circle" },
    { id: "line", icon: Minus, label: "Line" },
    { id: "triangle", icon: Triangle, label: "Triangle" },
    { id: "diamond", icon: Diamond, label: "Diamond" },
    { id: "pentagon", icon: Pentagon, label: "Pentagon" },
    { id: "hexagon", icon: Hexagon, label: "Hexagon" },
    { id: "star", icon: Star, label: "Star" },
  ];

  return (
    <div className={cn(
      "w-full flex flex-col sm:flex-row items-center rounded-2xl px-2 sm:px-4 py-2 mt-2 shadow-2xl",
      "bg-white/95 dark:bg-[#1f2937]/95 backdrop-blur-md",
      "border border-gray-200 dark:border-gray-700"
    )}>
      {/* Basic Tools */}
      <div className="flex flex-row items-center gap-1">
        {basicTools.map((tool) => (
          <ToolButton
            key={tool.id}
            isActive={activeTool === tool.id}
            onClick={() => onToolClick(tool.id as Tool)}
            icon={tool.icon}
            label={tool.label}
            shortcut={ICON_SHORTCUTS[tool.id]}
          />
        ))}

        {/* Shapes Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "h-10 w-10 rounded-xl flex items-center justify-center relative",
                shapes.some(s => s.id === activeTool) && "bg-blue-100 text-blue-700 dark:bg-blue-600 dark:text-white"
              )}
            >
              <Shapes className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="grid grid-cols-4 gap-2 p-2 bg-white dark:bg-[#1f2937]">
            {shapes.map((shape) => (
              <DropdownMenuItem
                key={shape.id}
                onClick={() => onToolClick(shape.id as Tool)}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 p-2 rounded-lg cursor-pointer",
                  activeTool === shape.id ? "bg-blue-100 dark:bg-blue-900" : "hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <shape.icon className="h-5 w-5" />
                <span className="text-[10px]">{shape.label}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <Separator orientation="vertical" className="h-8 mx-2 bg-gray-300 dark:bg-gray-600 hidden sm:block" />

      {/* Actions */}
      <div className="flex flex-row items-center gap-1">
        <ToolButton onClick={onUndo} icon={Undo} label="Undo" />
        <ToolButton onClick={onClear} icon={Trash2} label="Clear" />
        <ToolButton onClick={() => onZoom('in')} icon={ZoomIn} label="Zoom In" />
        <ToolButton onClick={() => onZoom('out')} icon={ZoomOut} label="Zoom Out" />
        <ToolButton onClick={onShowExport} icon={Download} label="Export" />
        
        {/* Settings / Color / Theme */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-10 w-10 rounded-xl">
              <ChevronDown className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 p-4 bg-white dark:bg-[#1f2937]">
            {/* Colors */}
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold">Color</h4>
              <div className="grid grid-cols-5 gap-2">
                {["#1e40af", "#dc2626", "#059669", "#d97706", "#7c3aed", "#000000"].map((c) => (
                  <button
                    key={c}
                    className={cn("w-6 h-6 rounded-full border", activeColor === c && "ring-2 ring-offset-2 ring-blue-500")}
                    style={{ backgroundColor: c }}
                    onClick={() => onColorChange(c)}
                  />
                ))}
                <input type="color" value={activeColor} onChange={(e) => onColorChange(e.target.value)} className="w-6 h-6 p-0 border-0 rounded-full" />
              </div>
            </div>
            
            {/* Stroke Width */}
            <div className="mb-4">
              <h4 className="mb-2 text-sm font-semibold">Stroke: {strokeWidth}px</h4>
              <input 
                type="range" min="1" max="10" 
                value={strokeWidth} 
                onChange={(e) => onStrokeWidthChange(Number(e.target.value))} 
                className="w-full"
              />
            </div>

            <Separator className="my-2" />
            
            {/* Theme Toggle */}
            <Button variant="ghost" className="w-full justify-start gap-2" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
            </Button>

            <Separator className="my-2" />

            {/* AI Trigger */}
            <Button variant="ghost" className="w-full justify-start gap-2 text-purple-600" onClick={onShowAI}>
              <Sparkles className="h-4 w-4" />
              <span>AI Assistant</span>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};