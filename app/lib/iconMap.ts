import { Boxes, CheckCircle, Clock, DollarSign, FileText, Package, Play, Search, Upload } from "lucide-react";

export const timelineIconMap = {
  CheckCircle,
  Upload,
  Play,
  Clock,
} as const;

export const statIconMap = {
  Play,
  Package,
  DollarSign,
} as const;

export const quickActionIconMap = {
  FileText,
  Boxes,
  Search,
} as const;
