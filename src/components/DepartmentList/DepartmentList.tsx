import React, { useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Checkbox, FormControlLabel, FormGroup } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

interface Department {
    department: string;
    sub_departments: string[];
}

interface DepartmentListProps {
    departments: Department[];
}

const DepartmentList: React.FC<DepartmentListProps> = ({ departments }) => {
    const [selectedDepartments, setSelectedDepartments] = useState<string[]>([]);

    const handleDepartmentSelect = (department: string) => {
        const departmentIndex = selectedDepartments.indexOf(department);
        let updatedSelectedDepartments = [...selectedDepartments];

        if (departmentIndex === -1) {
            // Department is not selected, so select it and its sub-departments
            updatedSelectedDepartments.push(department);
            const departmentData = departments.find((d) => d.department === department);
            if (departmentData) {
                updatedSelectedDepartments = [...updatedSelectedDepartments, ...departmentData.sub_departments];
            }
        } else {
            // Department is already selected, so deselect it and its sub-departments
            updatedSelectedDepartments.splice(departmentIndex, 1);
            const departmentData = departments.find((d) => d.department === department);
            if (departmentData) {
                updatedSelectedDepartments = updatedSelectedDepartments.filter((dep) => dep !== department && !departmentData.sub_departments.includes(dep));
            }
        }

        setSelectedDepartments(updatedSelectedDepartments);
    };


    const isDepartmentSelected = (department: string) => {
        return selectedDepartments.includes(department) || departments.find((d) => d.department === department)?.sub_departments.every((subDep) => selectedDepartments.includes(subDep));
    };

    return (
        <Box>
            {departments.map((dept) => (
                <Accordion key={dept.department}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={isDepartmentSelected(dept.department)}
                                    onChange={() => handleDepartmentSelect(dept.department)}
                                    indeterminate={
                                        selectedDepartments.some((dep) => dept.sub_departments.includes(dep)) &&
                                        !selectedDepartments.every((dep) => dept.sub_departments.includes(dep))
                                    }
                                />
                            }
                            label={dept.department}
                        />
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormGroup>
                            {dept.sub_departments.map((subDept) => (
                                <FormControlLabel
                                    key={subDept}
                                    control={
                                        <Checkbox
                                            checked={selectedDepartments.includes(subDept)}
                                            onChange={() => handleDepartmentSelect(subDept)}
                                        />
                                    }
                                    label={subDept}
                                />
                            ))}
                        </FormGroup>
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default DepartmentList;
