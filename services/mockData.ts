import { Institution, Expert, Article, Review } from '../types';

const mockReviews: Review[] = [
  { id: 'r1', user: '李同学', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=1', rating: 5, comment: '老师讲得非常细致，实战项目对应聘很有帮助！', date: '2天前' },
  { id: 'r2', user: '王先生', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=2', rating: 4.5, comment: '环境不错，设备都很新，就是周末人有点多。', date: '1周前' },
  { id: 'r3', user: 'Chen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=3', rating: 5, comment: '性价比很高，推荐给大家。', date: '2周前' }
];

export const institutions: Institution[] = [
  {
    id: '1',
    name: '极客编程学院',
    category: 'IT技术',
    rating: 4.8,
    students: 1200,
    address: '科技园区软件大道101号',
    phone: '400-123-4567',
    description: '专注于前端、后端及人工智能开发的职业培训机构，拥有十年教学经验，名企导师授课。',
    features: ['就业保荐', '项目实战', '分期付款'],
    imageUrl: 'https://picsum.photos/400/300?random=1',
    courses: ['React 高级开发', 'Python 数据分析', 'Java 微服务架构'],
    priceRange: '¥5000 - ¥15000',
    reviews: mockReviews
  },
  {
    id: '2',
    name: '新东方烹饪实训基地',
    category: '餐饮技能',
    rating: 4.6,
    students: 3500,
    address: '市中心美食街区88号',
    phone: '021-8888-9999',
    description: '培养国家级厨师，涵盖中餐、西餐、西点烘焙，提供现代化厨房设备进行实操训练。',
    features: ['实材实料', '名师指导', '创业扶持'],
    imageUrl: 'https://picsum.photos/400/300?random=2',
    courses: ['金牌大厨', '经典西点', '日韩料理'],
    priceRange: '¥3000 - ¥8000',
    reviews: [mockReviews[1], mockReviews[2]]
  },
  {
    id: '3',
    name: '雅思托福语言中心',
    category: '语言培训',
    rating: 4.9,
    students: 800,
    address: '国际教育大厦12层',
    phone: '400-888-6666',
    description: '专注出国语言考试培训，小班授课，根据学员水平定制专属学习计划。',
    features: ['外教口语', '真题模考', '保分协议'],
    imageUrl: 'https://picsum.photos/400/300?random=3',
    courses: ['雅思7分班', '托福冲刺班', '商务英语'],
    priceRange: '¥2000 - ¥12000',
    reviews: mockReviews
  },
  {
    id: '4',
    name: '视觉艺术设计工坊',
    category: '设计创意',
    rating: 4.7,
    students: 600,
    address: '创意产业园A栋302',
    phone: '010-6666-7777',
    description: '培养UI/UX设计师、平面设计师，注重审美与商业价值的结合。',
    features: ['4A总监带队', 'MAC机房', '作品集指导'],
    imageUrl: 'https://picsum.photos/400/300?random=4',
    courses: ['UI 全链路设计', '商业插画', 'C4D 视觉特效'],
    priceRange: '¥6000 - ¥10000',
    reviews: [mockReviews[0], mockReviews[2]]
  }
];

export const experts: Expert[] = [
  {
    id: 'e1',
    name: '张伟',
    title: '资深人力资源总监',
    company: '知名互联网大厂',
    avatarUrl: 'https://picsum.photos/200/200?random=10',
    expertise: ['简历优化', '面试技巧', '薪酬谈判'],
    yearsExperience: 15,
    phone: '138-0000-0001',
    bio: '曾任职于多家世界500强企业，阅人无数，擅长挖掘求职者核心竞争力，帮助突破职业瓶颈。',
    rating: 5.0,
    availability: '周末全天',
    reviews: [
      { id: 'er1', user: '小刘', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=4', rating: 5, comment: '张老师一针见血，帮我修改后的简历命中率大大提高！', date: '3天前' }
    ]
  },
  {
    id: 'e2',
    name: '李娜',
    title: '职业生涯规划师',
    company: '向阳生涯',
    avatarUrl: 'https://picsum.photos/200/200?random=11',
    expertise: ['职业定位', '转型指导', '心理咨询'],
    yearsExperience: 8,
    phone: '139-1111-2222',
    bio: '拥有全球职业规划师(GCDF)认证，专注于帮助大学生及职场新人找到适合自己的职业发展道路。',
    rating: 4.8,
    availability: '周一至周五晚间',
    reviews: []
  },
  {
    id: 'e3',
    name: '王强',
    title: '技术面试官',
    company: '独角兽科技',
    avatarUrl: 'https://picsum.photos/200/200?random=12',
    expertise: ['技术评估', '架构设计', '代码审查'],
    yearsExperience: 12,
    phone: '137-3333-4444',
    bio: '全栈架构师，担任多次校招及社招技术主面官，深知技术面试中的坑点与加分项。',
    rating: 4.9,
    availability: '需预约',
    reviews: [
        { id: 'er2', user: 'CodeMaster', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=5', rating: 5, comment: '模拟面试太真实了，虽然被虐但是学到了很多。', date: '1周前' }
    ]
  }
];

export const articles: Article[] = [
    {
        id: 'a1',
        title: '2025春招求职攻略：如何抓住“金三银四”',
        tag: '求职必读',
        summary: '详细解析今年春招的市场动态，以及应届生如何高效投递简历...',
        views: 3420,
        date: '2024-02-15',
        imageUrl: 'https://picsum.photos/400/200?random=20'
    },
    {
        id: 'a2',
        title: '面试官潜台词解读：当问到“你有什么缺点”时',
        tag: '面试技巧',
        summary: '这道送命题怎么答？避开雷区，展现自我反思与成长能力...',
        views: 5612,
        date: '2024-02-10',
        imageUrl: 'https://picsum.photos/400/200?random=21'
    },
    {
        id: 'a3',
        title: '传统行业转行互联网，你需要做好这三点准备',
        tag: '职业转型',
        summary: '跨行跳槽不仅是换工作，更是思维方式的转变。专家深度剖析...',
        views: 2100,
        date: '2024-01-28',
        imageUrl: 'https://picsum.photos/400/200?random=22'
    }
];

export const trainingCategories = ['全部', 'IT技术', '语言培训', '设计创意', '餐饮技能', '职业资格', '机械制造'];

export const marketTrendData = [
  { name: 'AI/算法', value: 95 },
  { name: '前端开发', value: 80 },
  { name: '短视频运营', value: 88 },
  { name: '跨境电商', value: 75 },
  { name: '心理咨询', value: 65 },
  { name: '养老护理', value: 70 },
];