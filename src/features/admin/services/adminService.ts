// Mock API Calls untuk Admin

export const fetchDashboardStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ totalPeserta: 1234, totalSkema: 6, sertifikat: 487 });
    }, 800);
  });
};

export const saveSchemeData = async (schemeData: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Saved Scheme:', schemeData);
      resolve({ success: true, id: `scheme-${Date.now()}` });
    }, 1000);
  });
};

export const uploadMaterialData = async (data: { title: string; file: File; type: string }) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Material uploaded:', data);
      resolve({ success: true, url: 'https://example.com/material' });
    }, 1500);
  });
};

export const saveQuizQuestion = async (questionData: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Question saved:', questionData);
      resolve({ success: true });
    }, 800);
  });
};