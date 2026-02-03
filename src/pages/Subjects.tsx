import { useState } from 'react';
import { Plus } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { SubjectCard } from '@/components/subjects/SubjectCard';
import { AddSubjectModal } from '@/components/subjects/AddSubjectModal';
import { useStudy, Subject } from '@/context/StudyContext';
import { useCustomToast } from '@/components/shared/CustomToast';

const Subjects = () => {
  const { subjects, addSubject, updateSubject, deleteSubject } = useStudy();
  const { showToast, ToastComponent } = useCustomToast();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const handleEdit = (subject: Subject) => {
    setEditingSubject(subject);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteSubject(id);
    showToast('Subject deleted successfully', 'success');
  };

  const handleSave = (subjectData: Omit<Subject, 'id'>) => {
    if (editingSubject) {
      updateSubject(editingSubject.id, subjectData);
      showToast('Subject updated successfully', 'success');
    } else {
      addSubject(subjectData);
      showToast('Subject added successfully', 'success');
    }
    setEditingSubject(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingSubject(null);
  };

  return (
    <AppLayout>
      <ToastComponent />
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-3xl font-bold text-pure-white mb-2">
            My Subjects
          </h1>
          <p className="text-cool-gray">
            Manage your enrolled subjects and their settings
          </p>
        </div>
      </div>

      {/* Subjects Grid */}
      {subjects.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {subjects.map((subject) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card p-12 text-center">
          <p className="text-cool-gray mb-4">
            You haven't added any subjects yet
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Add Your First Subject
          </button>
        </div>
      )}

      {/* Floating Add Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-24 md:bottom-8 right-6 w-14 h-14 rounded-full gradient-cta flex items-center justify-center glow-emerald hover:scale-110 transition-transform shadow-lg"
      >
        <Plus className="w-6 h-6 text-white" />
      </button>

      {/* Add/Edit Modal */}
      <AddSubjectModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSave}
        editingSubject={editingSubject}
      />
    </AppLayout>
  );
};

export default Subjects;
