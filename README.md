3. ✅ Todo App – Status Kanban + Persistence
   Mô tả:
   Todo App nâng cao với trạng thái dạng Kanban + lưu localStorage.

Tính năng yêu cầu:
Mỗi Todo có: id, title, description, status (todo, in progress, done)
Có thể:
Thêm mới todo (form nhập vào)
Di chuyển todo giữa các cột (drag hoặc select box)
Sửa nội dung todo (click vào => chuyển thành input)
Xóa todo
Giao diện dạng 3 cột theo status (giống Trello lite)
Dùng localStorage để lưu danh sách todos
Chia thành các components: TodoForm, TodoItem, TodoColumn, TodoBoard
Bonus: Sort theo thời gian tạo mới nhất
Gợi ý dùng:
useState, useEffect, optional useReducer, custom hook, zustand + localStorage(persist)

--- Advanced version ---

```ts
type Priority = 'low' | 'medium' | 'high';

interface Todo {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in progress' | 'done';
  priority: Priority;
  deadline: string;       // ISO format: 2025-06-04T18:00
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

🛠 Tính năng bắt buộc
1. Tạo, sửa, xoá Todo
CRUD đầy đủ

Khi sửa → cập nhật updatedAt

2. Chọn độ ưu tiên (priority)
Select: low, medium, high

Hiển thị badge màu tương ứng trong danh sách

3. Deadline
Dùng input datetime-local

Todo hết hạn → hiện viền đỏ hoặc chữ đỏ

4. Tags
Nhập tag bằng ô input → nhấn Enter để thêm

Có thể xoá tag đã nhập

Hiển thị dưới dạng chip (badge)

5. Time metadata
createdAt, updatedAt sinh tự động

Hiển thị: Tạo 3 giờ trước, Cập nhật 5 phút trước

🔍 Tính năng nâng cao 
Filter theo:

Trạng thái

Độ ưu tiên

Deadline gần nhất

Có tag cụ thể

Sort theo thời gian tạo hoặc deadline

Hiển thị progress bar (bao nhiêu % todo đã hoàn thành)

