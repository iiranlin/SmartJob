import React, { useState } from 'react';
import { X, Phone, MapPin, Star, User, Building, Award, Calendar, MessageCircle } from 'lucide-react';
import { Institution, Expert } from '../types';

interface DetailModalProps {
  item: Institution | Expert | null;
  isOpen: boolean;
  onClose: () => void;
  type: 'institution' | 'expert';
}

const DetailModal: React.FC<DetailModalProps> = ({ item, isOpen, onClose, type }) => {
  const [booked, setBooked] = useState(false);
  
  // Reset booked state when modal opens/closes with new item
  React.useEffect(() => {
    if (isOpen) setBooked(false);
  }, [isOpen, item]);

  if (!isOpen || !item) return null;

  const isInstitution = type === 'institution';
  const data = item as any;

  const handleBook = () => {
      setBooked(true);
      // In a real app, this would open a form or call an API
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 transition-opacity pointer-events-auto"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl transform transition-transform duration-300 pointer-events-auto max-h-[90vh] flex flex-col animate-in slide-in-from-bottom-10 sm:slide-in-from-bottom-0 sm:zoom-in-95">
        
        {/* Header Image */}
        <div className="relative h-48 w-full bg-gray-200 shrink-0">
          <img 
            src={isInstitution ? data.imageUrl : data.avatarUrl} 
            alt={data.name} 
            className="w-full h-full object-cover"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/30 hover:bg-black/50 rounded-full text-white backdrop-blur-sm transition-colors"
          >
            <X size={20} />
          </button>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
             <h2 className="text-2xl font-bold text-white">{data.name}</h2>
             <p className="text-white/90 text-sm flex items-center mt-1">
               {isInstitution ? (
                 <span className="bg-blue-500 px-2 py-0.5 rounded text-xs mr-2">{data.category}</span>
               ) : (
                 <span className="bg-purple-500 px-2 py-0.5 rounded text-xs mr-2">{data.title}</span>
               )}
               <Star size={14} className="text-yellow-400 fill-current mr-1" />
               {data.rating}
             </p>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto no-scrollbar flex-1">
          {/* Info Section */}
          <div className="mb-6 space-y-3">
             {isInstitution ? (
               <div className="flex items-start text-gray-600">
                 <MapPin size={18} className="mr-2 mt-0.5 text-blue-500 shrink-0" />
                 <span>{data.address}</span>
               </div>
             ) : (
               <div className="flex items-start text-gray-600">
                  <Building size={18} className="mr-2 mt-0.5 text-purple-500 shrink-0" />
                  <span>任职于: {data.company}</span>
               </div>
             )}
             
             {!isInstitution && (
               <div className="flex items-center text-gray-600">
                  <User size={18} className="mr-2 text-purple-500 shrink-0" />
                  <span>从业经验: {data.yearsExperience} 年</span>
               </div>
             )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">简介</h3>
            <p className="text-gray-600 leading-relaxed text-sm text-justify">
              {data.description || data.bio}
            </p>
          </div>

          {/* Features/Expertise */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-2 text-lg">
              {isInstitution ? '特色服务' : '擅长领域'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {(isInstitution ? data.features : data.expertise).map((tag: string, idx: number) => (
                <span key={idx} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Courses */}
          {isInstitution && data.courses && (
             <div className="mb-6">
               <h3 className="font-bold text-gray-900 mb-2 text-lg">热门课程</h3>
               <ul className="space-y-2">
                 {data.courses.map((course: string, idx: number) => (
                   <li key={idx} className="flex items-center text-gray-600 bg-blue-50 p-2 rounded-lg">
                     <Award size={16} className="text-blue-500 mr-2" />
                     <span className="text-sm">{course}</span>
                   </li>
                 ))}
               </ul>
             </div>
          )}
          
          {/* Reviews Section */}
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-3 text-lg flex items-center">
                学员评价
                <span className="ml-2 text-xs font-normal text-gray-500">({data.reviews ? data.reviews.length : 0})</span>
            </h3>
            {data.reviews && data.reviews.length > 0 ? (
                <div className="space-y-3">
                    {data.reviews.map((review: any) => (
                        <div key={review.id} className="bg-gray-50 p-3 rounded-xl">
                            <div className="flex justify-between items-start mb-1">
                                <div className="flex items-center">
                                    <img src={review.avatar} alt="u" className="w-6 h-6 rounded-full mr-2 bg-gray-200" />
                                    <span className="text-xs font-bold text-gray-700">{review.user}</span>
                                </div>
                                <span className="text-[10px] text-gray-400">{review.date}</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-1">{review.comment}</p>
                            <div className="flex mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} size={10} className={`${i < Math.floor(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-sm text-gray-400 text-center py-4 bg-gray-50 rounded-xl border border-dashed border-gray-200">暂无评价</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 mb-2 flex gap-3">
             <button
              onClick={handleBook}
              disabled={booked}
              className={`flex-1 flex items-center justify-center py-3.5 rounded-xl font-bold transition-all ${
                  booked 
                  ? 'bg-green-100 text-green-700 cursor-default' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              <Calendar size={20} className="mr-2" />
              {booked ? '已提交预约' : '在线预约'}
            </button>
            
            <a 
              href={`tel:${data.phone}`}
              className={`flex-1 flex items-center justify-center py-3.5 rounded-xl font-bold text-white shadow-lg active:scale-[0.98] transition-all ${
                isInstitution ? 'bg-blue-600 shadow-blue-200' : 'bg-purple-600 shadow-purple-200'
              }`}
            >
              <Phone size={20} className="mr-2" />
              电话咨询
            </a>
          </div>
          <p className="text-center text-xs text-gray-400 mt-2">
              咨询热线: {data.phone}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;