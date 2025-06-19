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
