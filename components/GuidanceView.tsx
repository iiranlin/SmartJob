import React from 'react';
import { Expert } from '../types';
import { Briefcase, Star, MessageSquare, ChevronRight, BookOpen } from 'lucide-react';
import { articles } from '../services/mockData';

interface GuidanceViewProps {
  data: Expert[];
  onSelect: (item: Expert) => void;
}

const GuidanceView: React.FC<GuidanceViewProps> = ({ data, onSelect }) => {
  return (
    <div className="pb-8 pt-4 px-4 space-y-6">
       {/* Banner */}
      <div className="w-full h-32 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-500 flex flex-col justify-center px-6 shadow-lg text-white relative overflow-hidden">
         <div className="absolute right-0 top-0 opacity-20 transform translate-x-2 -translate-y-2">
            <Briefcase size={120} />
        </div>
        <h2 className="text-2xl font-bold z-10">名师指路</h2>
        <p className="opacity-90 z-10 text-sm mt-1">行业专家一对一，破解职业迷茫</p>
      </div>

      {/* Expert Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-800 flex items-center">
             <Star className="w-5 h-5 text-yellow-500 mr-1 fill-current" />
             金牌导师
          </h3>
          <span className="text-xs text-gray-500">查看更多 <ChevronRight size={12} className="inline" /></span>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {data.map((item) => (
            <div 
              key={item.id}
              onClick={() => onSelect(item)}
              className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 relative overflow-hidden hover:shadow-md transition-all cursor-pointer group active:scale-[0.99]"
            >
              {/* Top Section */}
              <div className="flex gap-4">
                  <div className="w-16 h-16 rounded-full bg-gray-200 overflow-hidden flex-shrink-0 border-2 border-purple-100">
                      <img src={item.avatarUrl} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                      <div className="flex justify-between items-start">
                          <div>
                              <h4 className="font-bold text-gray-900 text-lg">{item.name}</h4>
                              <p className="text-xs text-purple-600 font-medium bg-purple-50 inline-block px-1.5 rounded mt-0.5">{item.title}</p>
                          </div>
                          <div className="flex flex-col items-end">
                              <span className="flex items-center bg-yellow-50 text-yellow-700 text-xs px-2 py-0.5 rounded-full font-bold">
                                  <Star size={10} className="fill-current mr-1" />
                                  {item.rating}
                              </span>
                          </div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-1">{item.company} | 从业 {item.yearsExperience} 年</p>
                  </div>
              </div>
              
              {/* Divider */}
              <div className="w-full h-[1px] bg-gray-100 my-3"></div>

              {/* Bottom Section */}
              <div className="flex justify-between items-center">
                  <div className="flex gap-2 overflow-hidden">
                      {item.expertise.slice(0, 3).map((tag, i) => (
                          <span key={i} className="text-[10px] text-gray-500 bg-gray-50 border border-gray-200 px-2 py-0.5 rounded-full whitespace-nowrap">
                              {tag}
                          </span>
                      ))}
                  </div>
                  <button className="flex items-center text-xs font-bold text-purple-600 bg-purple-50 px-3 py-1.5 rounded-full group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <MessageSquare size={12} className="mr-1" />
                      咨询
                  </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Articles Section (Added Content) */}
      <div>
         <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-lg text-gray-800 flex items-center">
             <BookOpen className="w-5 h-5 text-blue-500 mr-1" />
             职场视野
          </h3>
          <span className="text-xs text-gray-500">阅读更多</span>
        </div>
        
        <div className="space-y-3">
            {articles.map((article) => (
                <div key={article.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex gap-3 hover:shadow-md transition-shadow cursor-pointer">
                    <div className="w-28 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <img src={article.imageUrl} alt={article.title} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col justify-between flex-1">
                        <h4 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">
                            {article.title}
                        </h4>
                        <div className="flex justify-between items-end mt-1">
                            <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                                {article.tag}
                            </span>
                            <span className="text-[10px] text-gray-400">
                                {article.views} 阅读
                            </span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </div>

    </div>
  );
};

export default GuidanceView;