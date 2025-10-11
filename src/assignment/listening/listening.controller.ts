import { Controller, Get, Post, Patch, Delete, Param, Body, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ListeningService } from './listening.service';
import { CreateAssignmentDto } from '../dto/create-assignment.dto';
import { UpdateAssignmentDto } from '../dto/update-assignment.dto';
import { SubmitAssignmentDto } from '../dto/submit-assignment.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';

@ApiTags('listening')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('listening')
export class ListeningController {
  constructor(private readonly listeningService: ListeningService) {}

  @Post('assignments')
  @ApiOperation({ summary: 'Create listening assignment' })
  @ApiResponse({ status: HttpStatus.CREATED })
  async create(@Body() dto: CreateAssignmentDto, @Req() req: any) {
    const data = await this.listeningService.createAssignment({
      ...dto,
      created_by: req.user?.sub || req.user?.userId,
      slug: undefined as any,
    });
    return { status: true, message: 'Created', data, statusCode: HttpStatus.CREATED };
  }

  @Get('assignments')
  @ApiOperation({ summary: 'List listening assignments' })
  @ApiResponse({ status: HttpStatus.OK })
  async findAll() {
    const data = await this.listeningService.findAll();
    return { status: true, message: 'Fetched', data, statusCode: HttpStatus.OK };
  }

  @Get('submissions')
  @ApiOperation({ summary: 'Get all listening submissions' })
  @ApiResponse({ status: HttpStatus.OK })
  async getAllSubmissions() {
    const data = await this.listeningService.getAllSubmissions();
    return { status: true, message: 'Fetched', data, statusCode: HttpStatus.OK };
  }

  @Get('assignments/:id')
  @ApiOperation({ summary: 'Get listening assignment' })
  @ApiResponse({ status: HttpStatus.OK })
  async findOne(@Param('id') id: string) {
    const data = await this.listeningService.findOne(id);
    return { status: true, message: 'Fetched', data, statusCode: HttpStatus.OK };
  }

  @Patch('assignments/:id')
  @ApiOperation({ summary: 'Update listening assignment' })
  @ApiResponse({ status: HttpStatus.OK })
  async update(@Param('id') id: string, @Body() dto: UpdateAssignmentDto) {
    const data = await this.listeningService.update(id, dto);
    return { status: true, message: 'Updated', data, statusCode: HttpStatus.OK };
  }

  @Delete('assignments/:id')
  @ApiOperation({ summary: 'Delete listening assignment' })
  @ApiResponse({ status: HttpStatus.OK })
  async remove(@Param('id') id: string) {
    const data = await this.listeningService.remove(id);
    return { status: true, message: 'Deleted', data, statusCode: HttpStatus.OK };
  }

  @Post('submissions')
  @ApiOperation({ 
    summary: 'Submit and grade listening assignment',
    description: 'Submit answers for a listening assignment and receive immediate grading with a score from 0-9 (rounded to .0 or .5)'
  })
  @ApiResponse({ 
    status: HttpStatus.OK,
    description: 'Assignment graded and saved successfully',
    })
  async submit(@Body() dto: SubmitAssignmentDto, @Req() req: any) {
    const data = await this.listeningService.gradeSubmission({
      ...dto,
      submitted_by: dto.submitted_by || req.user?.sub || req.user?.userId,
    });
    return { status: true, message: 'Graded', data, statusCode: HttpStatus.OK };
  }

  @Get('submissions/user/:userId')
  @ApiOperation({ summary: 'Get user listening submissions' })
  @ApiResponse({ status: HttpStatus.OK })
  async getUserSubmissions(@Param('userId') userId: string) {
    const data = await this.listeningService.getUserSubmissions(userId);
    return { status: true, message: 'Fetched', data, statusCode: HttpStatus.OK };
  }

  @Get('submissions/assignment/:assignmentId')
  @ApiOperation({ summary: 'Get all submissions for a listening assignment' })
  @ApiResponse({ status: HttpStatus.OK })
  async getAssignmentSubmissions(@Param('assignmentId') assignmentId: string) {
    const data = await this.listeningService.getAssignmentSubmissions(assignmentId);
    return { status: true, message: 'Fetched', data, statusCode: HttpStatus.OK };
  }

  @Get('submissions/:id')
  @ApiOperation({ summary: 'Get listening submission' })
  @ApiResponse({ status: HttpStatus.OK })
  async getSubmission(@Param('id') id: string) {
    const data = await this.listeningService.getSubmission(id);
    return { status: true, message: 'Fetched', data, statusCode: HttpStatus.OK };
  }
}


