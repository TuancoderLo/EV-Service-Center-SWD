/**
 * Technician Degree Hook
 * Handle degree and certification management for technicians
 */

import {
  getErrorMessage,
  logError,
  normalizeHttpError,
} from "@/src/utils/http-error";
import { useEffect, useState } from "react";

// Type definitions (would be moved to separate types file in real app)
export interface Degree {
  id: string;
  title: string;
  institution: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  isCompleted: boolean;
  gpa?: number;
  description?: string;
  certificateUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Certification {
  id: string;
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  isActive: boolean;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateDegreeRequest {
  title: string;
  institution: string;
  fieldOfStudy: string;
  startDate: string;
  endDate?: string;
  isCompleted: boolean;
  gpa?: number;
  description?: string;
}

export interface CreateCertificationRequest {
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  credentialId?: string;
  credentialUrl?: string;
  description?: string;
}

export interface UseTechDegreeReturn {
  degrees: Degree[];
  certifications: Certification[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createDegree: (data: CreateDegreeRequest) => Promise<Degree>;
  updateDegree: (
    degreeId: string,
    data: Partial<CreateDegreeRequest>
  ) => Promise<Degree>;
  deleteDegree: (degreeId: string) => Promise<void>;
  createCertification: (
    data: CreateCertificationRequest
  ) => Promise<Certification>;
  updateCertification: (
    certId: string,
    data: Partial<CreateCertificationRequest>
  ) => Promise<Certification>;
  deleteCertification: (certId: string) => Promise<void>;
  getActiveCertifications: () => Certification[];
  getExpiringCertifications: (daysAhead?: number) => Certification[];
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  clearError: () => void;
}

// Mock API functions (would be in actual API module)
const mockDegrees: Degree[] = [
  {
    id: "1",
    title: "Bachelor of Automotive Engineering",
    institution: "University of Technology",
    fieldOfStudy: "Automotive Engineering",
    startDate: "2018-09-01",
    endDate: "2022-06-15",
    isCompleted: true,
    gpa: 3.8,
    description:
      "Specialized in electric vehicle systems and battery technology",
    createdAt: "2022-07-01T00:00:00Z",
    updatedAt: "2022-07-01T00:00:00Z",
  },
  {
    id: "2",
    title: "Certificate in EV Technology",
    institution: "Technical Institute",
    fieldOfStudy: "Electric Vehicle Technology",
    startDate: "2023-01-15",
    endDate: "2023-06-30",
    isCompleted: true,
    gpa: 4.0,
    description:
      "Advanced certification in EV charging systems and maintenance",
    createdAt: "2023-07-01T00:00:00Z",
    updatedAt: "2023-07-01T00:00:00Z",
  },
];

const mockCertifications: Certification[] = [
  {
    id: "1",
    name: "Certified EV Technician",
    issuingOrganization: "Electric Vehicle Institute",
    issueDate: "2022-08-15",
    expirationDate: "2025-08-15",
    credentialId: "EVT-2022-001",
    isActive: true,
    description: "Certified to work on all types of electric vehicles",
    createdAt: "2022-08-15T00:00:00Z",
    updatedAt: "2022-08-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Battery Safety Specialist",
    issuingOrganization: "Battery Safety Council",
    issueDate: "2023-03-10",
    expirationDate: "2024-03-10",
    credentialId: "BSS-2023-045",
    isActive: true,
    description: "Specialized in high-voltage battery safety and handling",
    createdAt: "2023-03-10T00:00:00Z",
    updatedAt: "2023-03-10T00:00:00Z",
  },
];

const mockApiCall = <T>(data: T, delay: number = 800): Promise<T> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), delay);
  });
};

export const useTechDegree = (): UseTechDegreeReturn => {
  const [degrees, setDegrees] = useState<Degree[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);

      // Mock API calls
      const [degreesData, certificationsData] = await Promise.all([
        mockApiCall(mockDegrees),
        mockApiCall(mockCertifications),
      ]);

      setDegrees(degreesData);
      setCertifications(certificationsData);
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useTechDegree.fetchData");
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const createDegree = async (data: CreateDegreeRequest): Promise<Degree> => {
    try {
      setIsCreating(true);
      setError(null);

      // Validate required fields
      if (
        !data.title ||
        !data.institution ||
        !data.fieldOfStudy ||
        !data.startDate
      ) {
        throw new Error("Please fill in all required fields");
      }

      // Validate dates
      const startDate = new Date(data.startDate);
      const endDate = data.endDate ? new Date(data.endDate) : null;

      if (endDate && endDate <= startDate) {
        throw new Error("End date must be after start date");
      }

      // Mock API call
      const newDegree: Degree = {
        id: Date.now().toString(),
        ...data,
        certificateUrl: undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await mockApiCall(newDegree);

      // Add to local state
      setDegrees((prev) => [...prev, newDegree]);

      return newDegree;
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useTechDegree.createDegree");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsCreating(false);
    }
  };

  const updateDegree = async (
    degreeId: string,
    data: Partial<CreateDegreeRequest>
  ): Promise<Degree> => {
    try {
      setIsUpdating(true);
      setError(null);

      const existingDegree = degrees.find((d) => d.id === degreeId);
      if (!existingDegree) {
        throw new Error("Degree not found");
      }

      const updatedDegree: Degree = {
        ...existingDegree,
        ...data,
        updatedAt: new Date().toISOString(),
      };

      await mockApiCall(updatedDegree);

      // Update local state
      setDegrees((prev) =>
        prev.map((degree) => (degree.id === degreeId ? updatedDegree : degree))
      );

      return updatedDegree;
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useTechDegree.updateDegree");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteDegree = async (degreeId: string): Promise<void> => {
    try {
      setIsDeleting(true);
      setError(null);

      await mockApiCall(null, 500);

      // Remove from local state
      setDegrees((prev) => prev.filter((degree) => degree.id !== degreeId));
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useTechDegree.deleteDegree");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsDeleting(false);
    }
  };

  const createCertification = async (
    data: CreateCertificationRequest
  ): Promise<Certification> => {
    try {
      setIsCreating(true);
      setError(null);

      // Validate required fields
      if (!data.name || !data.issuingOrganization || !data.issueDate) {
        throw new Error("Please fill in all required fields");
      }

      // Validate dates
      const issueDate = new Date(data.issueDate);
      const expirationDate = data.expirationDate
        ? new Date(data.expirationDate)
        : null;

      if (expirationDate && expirationDate <= issueDate) {
        throw new Error("Expiration date must be after issue date");
      }

      // Mock API call
      const newCertification: Certification = {
        id: Date.now().toString(),
        ...data,
        isActive: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await mockApiCall(newCertification);

      // Add to local state
      setCertifications((prev) => [...prev, newCertification]);

      return newCertification;
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useTechDegree.createCertification");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsCreating(false);
    }
  };

  const updateCertification = async (
    certId: string,
    data: Partial<CreateCertificationRequest>
  ): Promise<Certification> => {
    try {
      setIsUpdating(true);
      setError(null);

      const existingCertification = certifications.find((c) => c.id === certId);
      if (!existingCertification) {
        throw new Error("Certification not found");
      }

      const updatedCertification: Certification = {
        ...existingCertification,
        ...data,
        updatedAt: new Date().toISOString(),
      };

      await mockApiCall(updatedCertification);

      // Update local state
      setCertifications((prev) =>
        prev.map((cert) => (cert.id === certId ? updatedCertification : cert))
      );

      return updatedCertification;
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useTechDegree.updateCertification");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteCertification = async (certId: string): Promise<void> => {
    try {
      setIsDeleting(true);
      setError(null);

      await mockApiCall(null, 500);

      // Remove from local state
      setCertifications((prev) => prev.filter((cert) => cert.id !== certId));
    } catch (err) {
      const httpError = normalizeHttpError(err);
      const errorMessage = getErrorMessage(httpError);

      logError(httpError, "useTechDegree.deleteCertification");
      setError(errorMessage);
      throw httpError;
    } finally {
      setIsDeleting(false);
    }
  };

  const getActiveCertifications = (): Certification[] => {
    return certifications.filter((cert) => cert.isActive);
  };

  const getExpiringCertifications = (
    daysAhead: number = 30
  ): Certification[] => {
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + daysAhead);

    return certifications.filter((cert) => {
      if (!cert.expirationDate || !cert.isActive) return false;

      const expirationDate = new Date(cert.expirationDate);
      return expirationDate <= futureDate && expirationDate > new Date();
    });
  };

  const clearError = () => {
    setError(null);
  };

  // Auto-fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []);

  return {
    degrees,
    certifications,
    isLoading,
    error,
    refetch: fetchData,
    createDegree,
    updateDegree,
    deleteDegree,
    createCertification,
    updateCertification,
    deleteCertification,
    getActiveCertifications,
    getExpiringCertifications,
    isCreating,
    isUpdating,
    isDeleting,
    clearError,
  };
};
