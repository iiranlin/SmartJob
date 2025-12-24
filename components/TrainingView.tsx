import React, { useState } from 'react';
import { Institution } from '../types';
import { MapPin, Users, Star, Search, Filter } from 'lucide-react';
import { trainingCategories } from '../services/mockData';

interface TrainingViewProps {
  data: Institution[];
  onSelect: (item: Institution) => void;
}

const TrainingView: React.FC<TrainingViewProps> = ({ data, onSelect }) => {
  const [activeCategory, setActiveCategory] = useState('全部');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredData = data.filter(item => {
    const matchesCategory = activeCategory === '全部' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.courses.some(c => c.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pb-8 pt-2 px-4 space-y-4">
      
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search size={16} className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm"
          placeholder="搜索机构或课程..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Tabs (Horizontal Scroll) */}
      <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-1 -mx-4 px-4">
        {trainingCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-blue-600 text-white shadow-md shadow-blue-200'
                : 'bg-white text-gray-600 border border-gray-100 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Banner */}
      {activeCategory === '全部' && !searchQuery && (
        <div className="w-full h-32 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex flex-col justify-center px-6 shadow-lg mb-6 text-white relative overflow-hidden animate-in fade-in slide-in-from-bottom-4">
            <div className="absolute right-0 top-0 opacity-20 transform translate-x-4 -translate-y-4">
                <Star size={120} />
            </div>
            <h2 className="text-2xl font-bold z-10">技能提升计划</h2>
            <p className="opacity-90 z-10 text-sm mt-1">掌握一技之长，成就更好未来</p>
        </div>
      )}

      {/* Results Header */}
      <div className="flex items-center justify-between mb-2 mt-2">
        <h3 className="font-bold text-lg text-gray-800 flex items-center">
            {activeCategory === '全部' ? '推荐机构' : `${activeCategory} 机构`}
        </h3>
        <span className="text-xs text-gray-500">共 {filteredData.length} 家</span>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4 min-h-[300px]">
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <div 
              key={item.id}
              onClick={() => onSelect(item)}
              className="bg-white rounded-xl p-3 shadow-sm border border-gray-100 flex gap-4 hover:shadow-md transition-shadow cursor-pointer active:scale-[0.99] transform transition-transform"
            >
              <div className="w-24 h-24 rounded-lg bg-gray-200 overflow-hidden flex-shrink-0 relative">
                <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-[10px] px-1.5 py-0.5 rounded-bl-lg">
                    {item.rating}分
                </div>
              </div>
              
              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-gray-900 line-clamp-1 text-base">{item.name}</h4>
                    <span className="bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded border border-blue-100 whitespace-nowrap">
                      {item.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center mt-1 text-xs text-gray-500">
                    <Users size={12} className="mr-1 text-gray-400" />
                    <span className="mr-3">{item.students}人已学</span>
                    <span className="text-orange-500 font-medium">{item.priceRange}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap gap-1">
                      {item.features.slice(0,2).map((tag, i) => (
                          <span key={i} className="text-[10px] px-1.5 py-0.5 bg-gray-50 text-gray-500 rounded">{tag}</span>
                      ))}
                  </div>
                  <div className="flex items-center text-xs text-gray-400 truncate">
                      <MapPin size={12} className="mr-1" />
                      <span className="truncate">{item.address}</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-gray-400">
             <Filter size={48} className="mb-2 opacity-20" />
             <p>没有找到相关机构</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingView;