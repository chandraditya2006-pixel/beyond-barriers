// src/context/AppContext.jsx
import React, { createContext, useContext, useState } from 'react';
import { mockStudent } from '../data/mockStudent';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [student, setStudent] = useState(mockStudent);
  const [toasts, setToasts] = useState([]);
  const [activeModal, setActiveModal] = useState(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Mock Authentication State (Client-Side Only)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('beyond_barriers_auth') === 'true';
  });

  const login = (studentId, password) => {
    // Validates demo credentials: CS21B044 / demo123 (or ananya.sharma@campus.edu)
    const normalizedId = studentId.trim().toUpperCase();
    if ((normalizedId === "CS21B044" || normalizedId === "ANANYA.SHARMA@CAMPUS.EDU") && password === "demo123") {
      setIsAuthenticated(true);
      localStorage.setItem('beyond_barriers_auth', 'true');
      addToast(`Welcome back, ${student.name}!`, 'success');
      return true;
    }
    // Also allow case-insensitive demo credentials for convenience in hackathon testing
    if (studentId.trim() && password === "demo123") {
      setIsAuthenticated(true);
      localStorage.setItem('beyond_barriers_auth', 'true');
      addToast(`Signed in as ${student.name} (Demo Mode)`, 'success');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('beyond_barriers_auth');
    addToast("Logged out successfully.", "info");
  };

  // Bookmarking state for recommendations & opportunities
  const [bookmarkedRecIds, setBookmarkedRecIds] = useState(() => 
    new Set(mockStudent.recommendations.filter(r => r.bookmarked).map(r => r.id))
  );

  const [bookmarkedOppIds, setBookmarkedOppIds] = useState(() => 
    new Set(mockStudent.opportunities.filter(o => o.bookmarked).map(o => o.id))
  );

  // Track applied opportunities (simulated state)
  const [appliedOppIds, setAppliedOppIds] = useState(new Set(["opp-5"])); // initially connected with Arjun

  // Track career next steps checklist
  const [careerNextSteps, setCareerNextSteps] = useState(mockStudent.careerPathway.nextSteps);

  // Resolved barriers state
  const [resolvedBarriers, setResolvedBarriers] = useState(new Set());

  // Toast notification helper
  const addToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3800);
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Toggle recommendation bookmark
  const toggleBookmarkRec = (id, title) => {
    setBookmarkedRecIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        addToast(`Removed "${title}" from bookmarks`, 'info');
      } else {
        next.add(id);
        addToast(`Saved "${title}" to your bookmarks`, 'success');
      }
      return next;
    });
  };

  // Toggle opportunity bookmark
  const toggleBookmarkOpp = (id, title) => {
    setBookmarkedOppIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        addToast(`Removed "${title}" from saved opportunities`, 'info');
      } else {
        next.add(id);
        addToast(`Saved "${title}" to saved opportunities`, 'success');
      }
      return next;
    });
  };

  // Apply or enroll in opportunity
  const applyOpportunity = (opp) => {
    if (appliedOppIds.has(opp.id)) {
      addToast(`You have already submitted an application for ${opp.title}`, 'info');
      return;
    }
    setAppliedOppIds(prev => new Set([...prev, opp.id]));
    addToast(`Successfully applied for "${opp.title}"! Status: Under Review`, 'success');
  };

  // Career checklist toggle
  const toggleCareerStep = (id) => {
    setCareerNextSteps(prev => 
      prev.map(step => {
        if (step.id === id) {
          const updated = !step.completed;
          addToast(
            updated ? `Marked "${step.title}" as completed!` : `Reopened "${step.title}"`,
            updated ? 'success' : 'info'
          );
          return { ...step, completed: updated };
        }
        return step;
      })
    );
  };

  // Resolve or act on barrier
  const resolveBarrier = (barrierId, title) => {
    setResolvedBarriers(prev => {
      const next = new Set(prev);
      next.add(barrierId);
      return next;
    });
    addToast(`Action initiated for "${title}". Academic advisor alerted.`, 'success');
  };

  // Modal helpers
  const openModal = (config) => {
    setActiveModal(config);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Help Menu toggling
  const openHelp = () => setIsHelpOpen(true);
  const closeHelp = () => setIsHelpOpen(false);

  return (
    <AppContext.Provider value={{
      student,
      isAuthenticated,
      login,
      logout,
      toasts,
      addToast,
      removeToast,
      bookmarkedRecIds,
      toggleBookmarkRec,
      bookmarkedOppIds,
      toggleBookmarkOpp,
      appliedOppIds,
      applyOpportunity,
      careerNextSteps,
      toggleCareerStep,
      resolvedBarriers,
      resolveBarrier,
      activeModal,
      openModal,
      closeModal,
      isHelpOpen,
      openHelp,
      closeHelp
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
