import { ArrowLeft, Calendar, MapPin, Search, X } from 'lucide-react';
import { useState } from 'react';
import { allActivities } from './activityData';

interface SearchPageProps {
  onBack: () => void;
}

function SearchPage({ onBack }: SearchPageProps) {
  const [searchText, setSearchText] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([
    '周末羽毛球',
    '篮球约战',
    '咖啡品鉴',
  ]);

  // 搜索结果
  const searchResults = searchText.trim()
    ? allActivities.filter(
        (activity) =>
          activity.title.toLowerCase().includes(searchText.toLowerCase()) ||
          activity.location.toLowerCase().includes(searchText.toLowerCase())
      )
    : [];

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleDeleteHistoryItem = (index: number) => {
    setSearchHistory((prev) => prev.filter((_, i) => i !== index));
  };

  const handleHistoryClick = (text: string) => {
    setSearchText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] bg-gray-50 min-h-screen flex flex-col relative">
        {/* 状态栏 */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-gray-800 text-sm z-10">
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

        {/* 搜索栏 */}
        <div className="sticky top-0 bg-white z-20 px-4 pt-16 pb-3 shadow-sm">
          <div className="flex items-center gap-3">
            {/* 返回按钮 */}
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft className="w-5 h-5 text-gray-800" />
            </button>

            {/* 搜索输入框 */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="搜索活动、地点、类型"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all"
                autoFocus
              />
              {searchText && (
                <button
                  onClick={() => setSearchText('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 搜索内容区域 */}
        <div className="flex-1 overflow-y-auto px-4 py-4">
          {!searchText.trim() ? (
            /* 搜索历史 */
            <div>
              {searchHistory.length > 0 && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-gray-900">搜索历史</h3>
                    <button
                      onClick={handleClearHistory}
                      className="text-xs text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      清空
                    </button>
                  </div>
                  <div className="space-y-2">
                    {searchHistory.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-white rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <button
                          onClick={() => handleHistoryClick(item)}
                          className="flex-1 text-left text-sm text-gray-700"
                        >
                          {item}
                        </button>
                        <button
                          onClick={() => handleDeleteHistoryItem(index)}
                          className="p-1 hover:bg-gray-200 rounded-full transition-colors"
                        >
                          <X className="w-4 h-4 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 热门搜索 */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-3">热门搜索</h3>
                <div className="flex flex-wrap gap-2">
                  {['羽毛球', '篮球', '咖啡', '展览', '徒步', '摄影', '美食'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSearchText(tag)}
                      className="px-4 py-2 bg-white rounded-full text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* 搜索结果 */
            <div>
              <div className="mb-3">
                <span className="text-sm text-gray-600">
                  找到 <span className="font-semibold text-gray-900">{searchResults.length}</span> 个相关活动
                </span>
              </div>

              {searchResults.length > 0 ? (
                <div className="space-y-3">
                  {searchResults.map((activity) => (
                    <div
                      key={activity.id}
                      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all"
                    >
                      <div className="flex gap-3 p-3">
                        {/* 封面图 */}
                        <div className="w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden">
                          <img
                            src={activity.coverImage}
                            alt={activity.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* 活动信息 */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2">
                            {activity.title}
                          </h3>

                          <div className="flex items-center gap-1 mb-1">
                            <Calendar className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600">{activity.time}</span>
                          </div>

                          <div className="flex items-center gap-1 mb-1">
                            <MapPin className="w-3 h-3 text-gray-500" />
                            <span className="text-xs text-gray-600 truncate">{activity.location}</span>
                          </div>

                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-500">
                              {activity.currentParticipants}/{activity.maxParticipants}人
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <p className="text-gray-500 text-sm">未找到相关活动</p>
                  <p className="text-gray-400 text-xs mt-1">试试其他关键词吧</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
