import { Camera, ChevronLeft, Clock, Download, Heart, MapPin, Plus, Share2, Upload, Users } from 'lucide-react';
import { useState } from 'react';

interface Photo {
  id: string;
  url: string;
  uploader: {
    name: string;
    avatar: string;
  };
  uploadTime: string;
  likes: number;
  isLiked: boolean;
}

interface ActivityReviewPageProps {
  onBack: () => void;
  activity: {
    title: string;
    date: string;
    location: string;
    duration: string;
    participantCount: number;
  };
}

function ActivityReviewPage({ onBack, activity }: ActivityReviewPageProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1534367507873-d2d7e24c797f?w=600&h=600&fit=crop',
      uploader: {
        name: '张三',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhang',
      },
      uploadTime: '2小时前',
      likes: 24,
      isLiked: false,
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&h=600&fit=crop',
      uploader: {
        name: '李四',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Li',
      },
      uploadTime: '3小时前',
      likes: 18,
      isLiked: true,
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&h=600&fit=crop',
      uploader: {
        name: '王五',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wang',
      },
      uploadTime: '5小时前',
      likes: 32,
      isLiked: false,
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&h=600&fit=crop',
      uploader: {
        name: '赵六',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhao',
      },
      uploadTime: '6小时前',
      likes: 15,
      isLiked: false,
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600&h=600&fit=crop',
      uploader: {
        name: '孙七',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Sun',
      },
      uploadTime: '1天前',
      likes: 27,
      isLiked: true,
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?w=600&h=600&fit=crop',
      uploader: {
        name: '周八',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Zhou',
      },
      uploadTime: '1天前',
      likes: 21,
      isLiked: false,
    },
  ]);

  const handleLikePhoto = (photoId: string) => {
    setPhotos(photos.map(photo => {
      if (photo.id === photoId) {
        return {
          ...photo,
          isLiked: !photo.isLiked,
          likes: photo.isLiked ? photo.likes - 1 : photo.likes + 1,
        };
      }
      return photo;
    }));
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // 模拟上传照片
      Array.from(files).forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto: Photo = {
            id: Date.now().toString() + Math.random(),
            url: e.target?.result as string,
            uploader: {
              name: '我',
              avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Me',
            },
            uploadTime: '刚刚',
            likes: 0,
            isLiked: false,
          };
          setPhotos(prev => [newPhoto, ...prev]);
        };
        reader.readAsDataURL(file);
      });
      setShowUploadModal(false);
    }
  };

  const totalLikes = photos.reduce((sum, photo) => sum + photo.likes, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] bg-gray-50 min-h-screen flex flex-col relative">
        {/* 状态栏 */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white text-sm z-30">
          <span className="font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 20h4v-4H2v4zm6 0h4v-8H8v8zm6 0h4V10h-4v10zm6-18v18h4V2h-4z"/>
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
            </svg>
          </div>
        </div>

        {/* 头部 */}
        <div className="bg-gradient-to-b from-[#f98801] to-[#ff9f3a] pt-16 pb-6 px-4">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors active:scale-95"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-colors active:scale-95">
              <Share2 className="w-5 h-5 text-white" />
            </button>
          </div>

          <div className="text-white mb-6">
            <h1 className="text-2xl font-bold mb-2">{activity.title}</h1>
            <div className="flex items-center gap-4 text-sm text-white/90">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{activity.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                <span>{activity.location}</span>
              </div>
            </div>
          </div>

          {/* 活动数据统计 */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-white mb-1">{photos.length}</div>
              <div className="text-xs text-white/80">照片</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-white mb-1">{activity.participantCount}</div>
              <div className="text-xs text-white/80">参与者</div>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-xl p-3 text-center">
              <div className="text-2xl font-bold text-white mb-1">{totalLikes}</div>
              <div className="text-xs text-white/80">获赞</div>
            </div>
          </div>
        </div>

        {/* 内容区域 */}
        <div className="flex-1 overflow-y-auto pb-20">
          {/* 活动亮点 */}
          <div className="bg-white px-4 py-5 mb-2">
            <h2 className="text-base font-semibold text-gray-900 mb-3">活动亮点</h2>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-3.5 h-3.5 text-green-600" />
                </div>
                <span className="text-gray-700">活动时长 {activity.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                  <Users className="w-3.5 h-3.5 text-blue-600" />
                </div>
                <span className="text-gray-700">{activity.participantCount} 人全员参与</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <Camera className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <span className="text-gray-700">共拍摄 {photos.length} 张精彩照片</span>
              </div>
            </div>
          </div>

          {/* 照片墙 */}
          <div className="bg-white px-4 py-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-semibold text-gray-900">精彩瞬间</h2>
              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-1 text-sm text-[#f98801] font-medium"
              >
                <Plus className="w-4 h-4" />
                上传照片
              </button>
            </div>

            {/* 瀑布流照片网格 */}
            <div className="grid grid-cols-2 gap-2">
              {/* 上传卡片 */}
              <label className="relative cursor-pointer rounded-lg overflow-hidden bg-gray-50 border-2 border-dashed border-gray-300 active:border-[#f98801] transition-colors h-48 flex flex-col items-center justify-center">
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-gray-400" />
                  </div>
                  <span className="text-sm text-gray-500">点击上传照片</span>
                </div>
              </label>

              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="relative cursor-pointer rounded-lg overflow-hidden bg-gray-100 active:opacity-90 transition-opacity"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <img
                    src={photo.url}
                    alt="活动照片"
                    className="w-full h-48 object-cover"
                  />
                  {/* 底部信息栏 - 始终显示 */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none">
                    <div className="absolute bottom-0 left-0 right-0 p-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <img
                            src={photo.uploader.avatar}
                            alt={photo.uploader.name}
                            className="w-5 h-5 rounded-full"
                          />
                          <span className="text-xs text-white font-medium">{photo.uploader.name}</span>
                        </div>
                        <div className="flex items-center gap-1 text-white">
                          <Heart className={`w-3.5 h-3.5 ${photo.isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                          <span className="text-xs">{photo.likes}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 底部操作栏 */}
        <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 p-4 z-30">
          <div className="flex gap-3">
            <button
              onClick={() => setShowUploadModal(true)}
              className="flex-1 py-3 rounded-xl border-2 font-semibold text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ borderColor: '#f98801', color: '#f98801' }}
            >
              <Upload className="w-5 h-5" />
              上传照片
            </button>
            <button
              className="flex-1 py-3 rounded-xl text-white font-semibold text-base transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              style={{ backgroundColor: '#f98801' }}
            >
              <Share2 className="w-5 h-5" />
              分享回顾
            </button>
          </div>
        </div>

        {/* 上传照片弹窗 */}
        {showUploadModal && (
          <div
            className="fixed inset-0 bg-black/50 z-50 flex items-end justify-center"
            onClick={() => setShowUploadModal(false)}
          >
            <div
              className="w-[375px] bg-white rounded-t-3xl p-6 animate-slide-up"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
              <h3 className="text-lg font-bold text-gray-900 mb-4">上传照片</h3>
              
              <div className="space-y-3">
                <label className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors active:scale-[0.98]">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-full bg-[#f98801]/10 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-[#f98801]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">从相册选择</div>
                    <div className="text-sm text-gray-500">选择一张或多张照片</div>
                  </div>
                </label>

                <label className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl cursor-pointer hover:bg-gray-100 transition-colors active:scale-[0.98]">
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleFileSelect}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <Camera className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-gray-900">拍照上传</div>
                    <div className="text-sm text-gray-500">使用相机拍摄照片</div>
                  </div>
                </label>
              </div>

              <button
                onClick={() => setShowUploadModal(false)}
                className="w-full mt-4 py-3 rounded-xl bg-gray-200 text-gray-700 font-semibold transition-all active:scale-[0.98]"
              >
                取消
              </button>
            </div>
          </div>
        )}

        {/* 照片详情浮层 */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setSelectedPhoto(null)}
          >
            <div className="w-[375px] h-full flex flex-col">
              {/* 顶部操作栏 */}
              <div className="flex items-center justify-between px-4 pt-16 pb-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto(null);
                  }}
                  className="p-2 bg-white/10 backdrop-blur-sm rounded-full"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-white/10 backdrop-blur-sm rounded-full"
                  >
                    <Download className="w-5 h-5 text-white" />
                  </button>
                  <button
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 bg-white/10 backdrop-blur-sm rounded-full"
                  >
                    <Share2 className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* 照片 */}
              <div className="flex-1 flex items-center justify-center px-4" onClick={(e) => e.stopPropagation()}>
                <img
                  src={selectedPhoto.url}
                  alt="照片详情"
                  className="max-w-full max-h-full object-contain rounded-lg"
                />
              </div>

              {/* 底部信息 */}
              <div className="px-4 pb-8 pt-4" onClick={(e) => e.stopPropagation()}>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={selectedPhoto.uploader.avatar}
                        alt={selectedPhoto.uploader.name}
                        className="w-10 h-10 rounded-full"
                      />
                      <div>
                        <div className="text-white font-semibold text-sm">{selectedPhoto.uploader.name}</div>
                        <div className="text-white/60 text-xs">{selectedPhoto.uploadTime}</div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLikePhoto(selectedPhoto.id);
                        setSelectedPhoto({
                          ...selectedPhoto,
                          isLiked: !selectedPhoto.isLiked,
                          likes: selectedPhoto.isLiked ? selectedPhoto.likes - 1 : selectedPhoto.likes + 1,
                        });
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 rounded-full"
                    >
                      <Heart
                        className={`w-5 h-5 ${selectedPhoto.isLiked ? 'fill-red-500 text-red-500' : 'text-white'}`}
                      />
                      <span className="text-white text-sm font-medium">{selectedPhoto.likes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ActivityReviewPage;
