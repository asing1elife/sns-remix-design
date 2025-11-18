# 陌生人社交网络项目技术总结

## 项目概述

这是一个基于 React + TypeScript 的陌生人社交网络原型项目，模拟微信小程序的交互体验，专注于通过活动组织帮助用户结识新朋友。

## 技术栈

- **框架**: React 18.3.1
- **语言**: TypeScript
- **构建工具**: Vite 5.4.2
- **样式**: Tailwind CSS 3.4.1
- **图标**: Lucide React
- **包管理器**: pnpm

## 设计规范

### 视觉设计

#### 色彩系统
- **主色调**: `#f98801` (橙色) - 用于按钮、强调元素、品牌标识
- **副色调**: `#006666` (青色) - 用于次要元素
- **状态色**:
  - 成功/确认: `#10B981` (绿色)
  - 警告/待确认: `#F59E0B` (黄色)
  - 错误/取消: `#DC2626` (红色)
  - 禁用/中性: `#6B7280` (灰色)

#### 布局规范
- **固定宽度**: 375px (模拟微信小程序)
- **圆角规范**: 
  - 小按钮/标签: `rounded-full` (完全圆角)
  - 卡片: `rounded-xl` (12px)
  - 大容器: `rounded-3xl` (24px，顶部圆角)
- **间距系统**: 
  - 页面边距: `px-4` (16px)
  - 卡片间距: `gap-2` (8px)
  - 内容间距: `gap-3` (12px)

#### 交互反馈
- **点击反馈**: `active:scale-[0.98]` - 轻微缩放
- **禁用状态**: `disabled:opacity-50 disabled:cursor-not-allowed`
- **过渡动画**: `transition-all` - 平滑过渡
- **无悬浮效果**: 移除所有 `hover` 效果（触摸屏设备）

### 组件设计原则

1. **移动优先**: 所有交互设计针对触摸屏优化
2. **状态栏模拟**: 每个页面顶部包含状态栏（时间、信号、电池）
3. **半屏弹窗**: 使用 `max-h-[70vh]` 从底部滑入的弹窗
4. **信息始终可见**: 重要信息不依赖悬浮显示，直接展示或使用半透明遮罩

## 项目结构

```
src/social/
├── ExplorePage.tsx              # 探索页（首页）
├── SearchPage.tsx               # 搜索页
├── ActivityDetailPage.tsx       # 活动详情页
├── ActivityReviewPage.tsx       # 活动回顾页（照片墙）
├── MyActivitiesPage.tsx         # 我的活动页
├── ProfilePage.tsx              # 个人中心页
├── CreateActivityPage.tsx       # 创建活动页
├── ServiceBookingPage.tsx       # 服务预订页
├── BookingPendingPage.tsx       # 预订待审核页
├── ParticipantDetailModal.tsx   # 参与者详情弹窗组件
├── activityData.ts              # 活动数据模拟
└── App.tsx                      # 主应用入口
```

## 核心功能模块

### 1. 探索页 (ExplorePage)

**功能特性**:
- 顶部操作栏: 搜索、扫码、发布活动
- 分类筛选: 全部、运动健身、户外、聚会、学习、娱乐、美食、其他
- 活动卡片瀑布流布局（2列）
- 活动信息展示: 封面图、标题、地点、时间、参与人数
- 特殊标识:
  - **热门标签**: 橙色圆形徽章，位于图片左上角
  - **距离标签**: 半透明黑色徽章，位于图片左下角（如 "1.2 公里"）

**交互逻辑**:
- 点击搜索图标 → 进入搜索页
- 点击活动卡片 → 进入活动详情页
- 下拉刷新、上拉加载更多

**关键代码特征**:
- 徽章文本使用 `leading-none` 消除默认行高
- 使用 `flex items-center` 实现垂直居中
- 距离徽章: `bg-black/50 backdrop-blur-sm`

### 2. 搜索页 (SearchPage)

**功能特性**:
- 搜索历史管理（本地存储）
- 热门搜索标签（移除了🔥 emoji）
- 实时搜索过滤
- 搜索结果展示（活动列表）

**交互逻辑**:
- 输入搜索词实时过滤
- 点击历史/热门标签快速搜索
- 清空搜索历史

### 3. 活动详情页 (ActivityDetailPage)

**功能特性**:
- 活动状态展示（进行中、已完成、待确认、已取消）
- 场地信息、时间信息
- 发起人信息（仅参与者可见）
- **参与者列表**（可点击查看详情）
- 费用明细
- **评论区**（点赞、发布评论）
- 地图导航占位
- 底部操作按钮（根据状态和角色变化）

**状态逻辑**:
- `ongoing` (进行中): 显示倒计时，发起人可结束活动/联系参与者，参与者可签到
- `completed` (已完成): 显示"查看回顾"和"再来一次"按钮
- `pending` (待确认): 发起人可催促确认/取消活动，参与者可确认/拒绝
- `cancelled` (已取消): 只显示返回按钮

**参与者交互**:
- 点击参与者卡片 → 打开 `ParticipantDetailModal` 半屏弹窗
- 显示参与者详细信息、统计数据、兴趣爱好
- 提供发消息、打电话、添加好友等操作

### 4. 活动回顾页 (ActivityReviewPage)

**功能特性**:
- 渐变橙色头部背景
- 活动统计卡片（照片数、参与者数、获赞数）
- 活动亮点列表
- **照片墙**（2列瀑布流）
- **上传照片**功能（3个入口）
- 照片点赞功能
- 全屏照片浏览

**上传入口**:
1. 照片网格第一个位置的上传卡片
2. 标题栏右侧的"上传照片"按钮
3. 底部操作栏的"上传照片"按钮

**照片展示**:
- 每张照片底部显示上传者和点赞数（始终可见，无hover效果）
- 使用半透明渐变遮罩 `bg-gradient-to-t from-black/70`
- 点击照片 → 全屏浏览模式（黑色背景浮层）

**上传弹窗**:
- 从底部滑入的半屏弹窗
- 两个选项: "从相册选择"（多选）、"拍照上传"
- 支持 `multiple` 和 `capture` 属性

### 5. 参与者详情弹窗 (ParticipantDetailModal)

**共用组件**: 在 `ActivityDetailPage` 和 `ServiceBookingPage` 中复用

**功能特性**:
- 用户头像、姓名、好友标识（红心图标）
- 状态标签（自动适配多种状态）
- 个人标签展示
- 统计数据网格（3列）:
  - 参与活动次数
  - 共同活动次数
  - 活跃度评分（带星星图标）
- 个人简介
- 兴趣爱好标签
- **照片墙**（3列网格布局）:
  - 最多显示6张照片缩略图
  - 超过6张显示"+N"提示
  - 点击照片进入全屏预览模式
  - 全屏模式支持关闭按钮（右上角）
- 操作按钮（根据是否好友显示不同）

**接口设计**:
```typescript
interface ParticipantDetailModalProps {
  participant: {
    id: string;
    name: string;
    avatar: string;
    status?: 'available' | 'busy' | 'offline' | 'confirmed' | 'declined' | 'pending';
    isFriend?: boolean;
    bio?: string;
    fullBio?: string;
    totalActivities?: number;
    commonActivities?: number;
    activityScore?: number;
    interests?: string[];
    tags?: string[];
    photos?: Array<{
      id: string;
      url: string;
      activityTitle: string;
      date: string;
      likes: number;
    }>;
  } | null;
  onClose: () => void;
  onAction?: (actionType: 'message' | 'call' | 'addFriend') => void;
}
```

### 6. 其他页面

**MyActivitiesPage**: 我的活动列表（发起的/参与的）
**ProfilePage**: 个人中心（使用副色调 #006666）
**CreateActivityPage**: 创建活动表单
**ServiceBookingPage**: 服务预订（日期时间选择、邀请好友）
**BookingPendingPage**: 预订待审核状态页

## 数据结构

### Activity 接口
```typescript
interface Activity {
  id: string;
  title: string;
  coverImage: string;
  location: string;
  distance?: string;        // 距离信息（如 "1.2"）
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
  tags: string[];
  isHot?: boolean;          // 是否为热门
}
```

### Participant 接口
```typescript
interface Participant {
  id: string;
  name: string;
  avatar: string;
  status: 'confirmed' | 'declined' | 'pending';
  isFriend?: boolean;
}
```

## 关键技术决策

### 1. 状态管理
- 使用 React useState 进行本地状态管理
- 页面间通过 props 传递数据
- 使用状态标志控制页面/弹窗显示（如 `showSearchPage`, `selectedParticipant`）

### 2. 导航方案
- 基于状态的页面切换（非路由）
- 通过条件渲染显示不同页面
- `onBack` 回调函数返回上一页

### 3. 移动端优化
- 移除所有 `hover` 伪类，使用 `active` 替代
- 图片和重要信息始终可见，不依赖悬浮
- 使用 `active:scale-[0.98]` 提供点击反馈
- 半屏弹窗从底部滑入（`items-end justify-center`）

### 4. 徽章设计技巧
```tsx
// 问题：上下内边距不对称
// 原因：默认 line-height 导致
// 解决：添加 leading-none 和 flex items-center

<span className="px-2 py-1 rounded-full bg-[#f98801] text-white text-xs flex items-center">
  <span className="leading-none">热门</span>
</span>
```

### 5. 组件抽离原则
- 复用度高的UI（如参与者详情弹窗）抽离为独立组件
- 保持接口灵活性，支持不同使用场景
- 使用可选参数和回调函数增强可配置性

## 关键文件说明

- **activityData.ts**: 包含模拟活动数据，前3个热门活动有距离信息
- **App.tsx**: 主应用入口，管理全局状态
- **index.css**: 全局样式，Tailwind配置
- **tailwind.config.js**: Tailwind自定义配置
- **vite.config.ts**: Vite构建配置

## 设计哲学

1. **简洁优先**: 界面清爽，减少视觉噪音
2. **信息密度**: 在小屏幕上高效展示信息
3. **即时反馈**: 每个操作都有明确的视觉反馈
4. **一致性**: 统一的颜色、圆角、间距、交互模式
5. **可访问性**: 足够的触摸目标大小（最小44px）
6. **性能**: 流畅的动画和交互（60fps）

---

**最后更新**: 2025-11-18
**版本**: v1.0
**维护者**: 开发团队
